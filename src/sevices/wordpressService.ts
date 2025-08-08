import type { 
  TProject, 
  TRawWpProject,
  TPricingPlan,
  TRawWpPricingPlan,
  TService,
  TRawWpService,
  TTeamMember,
  TRawWpTeamMember,
  TBlogPost,
  TRawWpBlogPost,
  TSiteSettings,
  TRawWpSiteSettings
} from '../types';

// Import config
const API_BASE_URL = import.meta.env.VITE_WP_API_URL;
const FALLBACK_IMAGE_URL = import.meta.env.VITE_FALLBACK_IMAGE_URL ?? 'https://via.placeholder.com/150';
const WP_USERNAME = import.meta.env.VITE_WP_USERNAME;
const WP_APP_PASSWORD = import.meta.env.VITE_WP_APP_PASSWORD;

// ========== HELPER FUNCTIONS ==========

function ensureApiUrl(): string {
  if (!API_BASE_URL) {
    throw new Error('VITE_WP_API_URL is not defined in .env.local');
  }
  // Ensure the base URL ends with exactly one slash
  return API_BASE_URL.replace(/\/+$/, '') + '/';
}

async function fetchFromApi<T>(endpoint: string, retries: number = 3, delay: number = 1000): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching data from ${endpoint} (Attempt ${attempt})`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      };
      // Add authentication if credentials are provided
      if (WP_USERNAME && WP_APP_PASSWORD) {
        headers['Authorization'] = 'Basic ' + btoa(`${WP_USERNAME}:${WP_APP_PASSWORD}`);
      }
      const response = await fetch(endpoint, {
        headers,
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      return await response.json() as T;
    } catch (error) {
      if (attempt === retries || (error instanceof Error && error.name === 'AbortError')) {
        console.error(`Error fetching from ${endpoint} after ${retries} attempts:`, error);
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
    }
  }
  throw new Error('Unexpected error in fetchFromApi');
}

function cleanHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function getImageFromEmbedded(embedded: any, fallbackTitle: string = '') {
  const featuredImage = embedded?.['wp:featuredmedia']?.[0];
  return {
    url: featuredImage?.source_url ?? FALLBACK_IMAGE_URL,
    altText: featuredImage?.alt_text ?? fallbackTitle,
  };
}

// In-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

// ========== PROJECT FUNCTIONS ==========

export async function getFeaturedProjects(limit: number = 3): Promise<TProject[]> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?_embed&per_page=${limit}&categories=1`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) { // 1-minute TTL
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TProject[];
  }
  const data = await fetchFromApi<TRawWpProject[]>(endpoint);
  const rawProjects: TRawWpProject[] = data;
  const projects = rawProjects.map((project) => {
    const featuredImage = getImageFromEmbedded(project._embedded, project.title.rendered);
    return {
      id: project.id,
      slug: project.slug,
      title: project.title.rendered,
      excerpt: cleanHtmlTags(project.excerpt.rendered),
      content: project.content.rendered,
      featuredImage: {
        url: featuredImage.url,
        altText: featuredImage.altText
      },
      category: project.acf?.project_category || 'Project',
      projectUrl: project.acf?.project_url || project.acf?.project_link || ''
    };
  });
  cache.set(endpoint, { data: projects, timestamp: Date.now() });
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<TProject | null> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?slug=${slug}&_embed&categories=1`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TProject | null;
  }
  const data = await fetchFromApi<TRawWpProject[]>(endpoint);
  const rawProjects: TRawWpProject[] = data;
  if (rawProjects.length === 0) {
    return null;
  }
  const project = rawProjects[0];
  const result = {
    id: project.id,
    slug: project.slug,
    title: project.title.rendered,
    excerpt: cleanHtmlTags(project.excerpt.rendered),
    content: project.content.rendered,
    featuredImage: getImageFromEmbedded(project._embedded, project.title.rendered),
    category: project.acf?.project_category || 'Project',
    projectUrl: project.acf?.project_url || project.acf?.project_link || '',
  };
  cache.set(endpoint, { data: result, timestamp: Date.now() });
  return result;
}

// ========== PRICING FUNCTIONS ==========

export async function getPricingPlans(): Promise<TPricingPlan[]> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?categories=3&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TPricingPlan[];
  }
  const data = await fetchFromApi<TRawWpPricingPlan[]>(endpoint);
  const rawPlans: TRawWpPricingPlan[] = data;
  const plans = rawPlans.map((plan) => ({
    id: plan.id,
    title: plan.title.rendered,
    slug: plan.slug,
    price: parseFloat(plan.acf?.price || '0'),
    period: plan.acf?.period || '/month',
    features: plan.acf?.features ? plan.acf.features.split('\n').filter(f => f.trim()) : [],
    isPopular: plan.acf?.is_popular || false,
    description: plan.acf?.description || cleanHtmlTags(plan.content.rendered),
    ctaText: plan.acf?.cta_text || 'Get Started',
    ctaUrl: plan.acf?.cta_url || '/contact',
  }));
  cache.set(endpoint, { data: plans, timestamp: Date.now() });
  return plans;
}

// ========== SERVICE FUNCTIONS ==========

export async function getServices(): Promise<TService[]> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?categories=2&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TService[];
  }
  const data = await fetchFromApi<TRawWpService[]>(endpoint);
  const rawServices: TRawWpService[] = data;
  const services = rawServices.map((service) => ({
    id: service.id,
    title: service.title.rendered,
    slug: service.slug,
    excerpt: cleanHtmlTags(service.excerpt.rendered),
    content: service.content.rendered,
    icon: service.acf?.icon || '',
    price: service.acf?.price ? parseFloat(service.acf.price) : undefined,
    features: service.acf?.features ? service.acf.features.split('\n').filter(f => f.trim()) : [],
    featuredImage: getImageFromEmbedded(service._embedded, service.title.rendered),
  }));
  cache.set(endpoint, { data: services, timestamp: Date.now() });
  return services;
}

export async function getServiceBySlug(slug: string): Promise<TService | null> {
  const endpoint = `${ensureApiUrl()}wp/v2/services/?slug=${slug}&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TService | null;
  }
  const data = await fetchFromApi<TRawWpService[]>(endpoint);
  const rawServices: TRawWpService[] = data;
  if (rawServices.length === 0) {
    return null;
  }
  const service = rawServices[0];
  const result = {
    id: service.id,
    title: service.title.rendered,
    slug: service.slug,
    excerpt: cleanHtmlTags(service.excerpt.rendered),
    content: service.content.rendered,
    icon: service.acf?.icon || '',
    price: service.acf?.price ? parseFloat(service.acf.price) : undefined,
    features: service.acf?.features ? service.acf.features.split('\n').filter(f => f.trim()) : [],
    featuredImage: getImageFromEmbedded(service._embedded, service.title.rendered),
  };
  cache.set(endpoint, { data: result, timestamp: Date.now() });
  return result;
}

// ========== TEAM FUNCTIONS ==========

export async function getTeamMembers(): Promise<TTeamMember[]> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?categories=4&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TTeamMember[];
  }
  const data = await fetchFromApi<TRawWpTeamMember[]>(endpoint);
  const rawMembers: TRawWpTeamMember[] = data;
  const members = rawMembers.map((member) => ({
    id: member.id,
    name: member.title.rendered,
    slug: member.slug,
    role: member.acf?.role || '',
    bio: member.acf?.bio || cleanHtmlTags(member.content.rendered),
    image: getImageFromEmbedded(member._embedded, member.title.rendered),
    socialLinks: {
      linkedin: member.acf?.linkedin_url || undefined,
      twitter: member.acf?.twitter_url || undefined,
      email: member.acf?.email || undefined,
    },
  }));
  cache.set(endpoint, { data: members, timestamp: Date.now() });
  return members;
}

// ========== BLOG FUNCTIONS ==========

export async function getBlogPosts(limit: number = 10): Promise<TBlogPost[]> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?_embed&per_page=${limit}&categories_exclude=1`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TBlogPost[];
  }
  const data = await fetchFromApi<TRawWpBlogPost[]>(endpoint);
  const rawPosts: TRawWpBlogPost[] = data;
  const posts = rawPosts.map((post) => {
    const author = post._embedded?.author?.[0]?.name || 'Unknown Author';
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const category = categories.find(term => term.taxonomy === 'category')?.name || 'General';
    const tags = post._embedded?.['wp:term']?.[1]?.map(term => term.name) || [];
    return {
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: cleanHtmlTags(post.excerpt.rendered),
      content: post.content.rendered,
      author,
      date: new Date(post.date).toLocaleDateString(),
      category,
      featuredImage: getImageFromEmbedded(post._embedded, post.title.rendered),
      tags,
    };
  });
  cache.set(endpoint, { data: posts, timestamp: Date.now() });
  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<TBlogPost | null> {
  const endpoint = `${ensureApiUrl()}wp/v2/posts/?slug=${slug}&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TBlogPost | null;
  }
  const data = await fetchFromApi<TRawWpBlogPost[]>(endpoint);
  const rawPosts: TRawWpBlogPost[] = data;
  if (rawPosts.length === 0) {
    return null;
  }
  const post = rawPosts[0];
  const author = post._embedded?.author?.[0]?.name || 'Unknown Author';
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.find(term => term.taxonomy === 'category')?.name || 'General';
  const tags = post._embedded?.['wp:term']?.[1]?.map(term => term.name) || [];
  const result = {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: cleanHtmlTags(post.excerpt.rendered),
    content: post.content.rendered,
    author,
    date: new Date(post.date).toLocaleDateString(),
    category,
    featuredImage: getImageFromEmbedded(post._embedded, post.title.rendered),
    tags,
  };
  cache.set(endpoint, { data: result, timestamp: Date.now() });
  return result;
}

// ========== SITE SETTINGS FUNCTIONS ==========

export async function getSiteSettings(): Promise<TSiteSettings> {
  const endpoint = `${ensureApiUrl()}wp/v2/pages/?slug=site-settings&_embed`;
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log(`Returning cached data for ${endpoint}`);
    return cached.data as TSiteSettings;
  }
  const data = await fetchFromApi<TRawWpSiteSettings[]>(endpoint);
  const rawSettings: TRawWpSiteSettings = Array.isArray(data) ? data[0] : data;
  const settings = {
    siteName: rawSettings.acf?.site_name || '',
    siteDescription: rawSettings.acf?.site_description || '',
    logo: {
      url: rawSettings.acf?.logo?.url || FALLBACK_IMAGE_URL,
      altText: rawSettings.acf?.logo?.alt || '',
    },
    contactInfo: {
      email: rawSettings.acf?.contact_email || '',
      phone: rawSettings.acf?.contact_phone || '',
      address: rawSettings.acf?.contact_address || '',
      businessHours: rawSettings.acf?.business_hours || '',
    },
    socialLinks: {
      facebook: rawSettings.acf?.facebook_url || undefined,
      twitter: rawSettings.acf?.twitter_url || undefined,
      linkedin: rawSettings.acf?.linkedin_url || undefined,
      instagram: rawSettings.acf?.instagram_url || undefined,
    },
    currency: {
      symbol: rawSettings.acf?.currency_symbol || '',
      code: rawSettings.acf?.currency_code || '',
    },
  };
  cache.set(endpoint, { data: settings, timestamp: Date.now() });
  return settings;
}
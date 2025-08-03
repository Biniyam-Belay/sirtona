// src/services/wordpressService.ts

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

const API_BASE_URL = import.meta.env.VITE_WP_API_URL;

// ========== HELPER FUNCTIONS ==========

function ensureApiUrl(): string {
  if (!API_BASE_URL) {
    throw new Error('VITE_WP_API_URL is not defined in .env.local');
  }
  return API_BASE_URL;
}

function cleanHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function getImageFromEmbedded(embedded: any, fallbackTitle: string = '') {
  const featuredImage = embedded?.['wp:featuredmedia']?.[0];
  return {
    url: featuredImage?.source_url ?? '/placeholder-image.jpg',
    altText: featuredImage?.alt_text ?? fallbackTitle,
  };
}

// ========== PROJECT FUNCTIONS ==========

export async function getFeaturedProjects(limit: number = 3): Promise<TProject[]> {
  const endpoint = `${ensureApiUrl()}/wp/v2/posts?_embed&per_page=${limit}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    const rawProjects: TRawWpProject[] = await res.json();

    const projects: TProject[] = rawProjects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title.rendered,
      excerpt: cleanHtmlTags(project.excerpt.rendered),
      content: project.content.rendered,
      featuredImage: getImageFromEmbedded(project._embedded, project.title.rendered),
    }));

    return projects;

  } catch (error) {
    console.error("Error fetching featured projects:", error);
    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<TProject | null> {
  const endpoint = `${ensureApiUrl()}/wp/v2/posts?slug=${slug}&_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.statusText}`);
    }

    const rawProjects: TRawWpProject[] = await res.json();
    
    if (rawProjects.length === 0) {
      return null;
    }

    const project = rawProjects[0];
    return {
      id: project.id,
      slug: project.slug,
      title: project.title.rendered,
      excerpt: cleanHtmlTags(project.excerpt.rendered),
      content: project.content.rendered,
      featuredImage: getImageFromEmbedded(project._embedded, project.title.rendered),
    };

  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw error;
  }
}

// ========== PRICING FUNCTIONS ==========

export async function getPricingPlans(): Promise<TPricingPlan[]> {
  const endpoint = `${ensureApiUrl()}/wp/v2/pricing-plans?_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch pricing plans: ${res.statusText}`);
    }

    const rawPlans: TRawWpPricingPlan[] = await res.json();

    const plans: TPricingPlan[] = rawPlans.map((plan) => ({
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

    return plans;

  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    throw error;
  }
}

// ========== SERVICE FUNCTIONS ==========

export async function getServices(): Promise<TService[]> {
  const endpoint = `${ensureApiUrl()}/wp/v2/services?_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    const rawServices: TRawWpService[] = await res.json();

    const services: TService[] = rawServices.map((service) => ({
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

    return services;

  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function getServiceBySlug(slug: string): Promise<TService | null> {
  const endpoint = `${ensureApiUrl()}/wp/v2/services?slug=${slug}&_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch service: ${res.statusText}`);
    }

    const rawServices: TRawWpService[] = await res.json();
    
    if (rawServices.length === 0) {
      return null;
    }

    const service = rawServices[0];
    return {
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

  } catch (error) {
    console.error("Error fetching service by slug:", error);
    throw error;
  }
}

// ========== TEAM FUNCTIONS ==========

export async function getTeamMembers(): Promise<TTeamMember[]> {
  const endpoint = `${ensureApiUrl()}/wp/v2/team-members?_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch team members: ${res.statusText}`);
    }

    const rawMembers: TRawWpTeamMember[] = await res.json();

    const members: TTeamMember[] = rawMembers.map((member) => ({
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

    return members;

  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
}

// ========== BLOG FUNCTIONS ==========

export async function getBlogPosts(limit: number = 10): Promise<TBlogPost[]> {
  const endpoint = `${ensureApiUrl()}/wp/v2/posts?_embed&per_page=${limit}&categories_exclude=1`; // Exclude uncategorized

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
    }

    const rawPosts: TRawWpBlogPost[] = await res.json();

    const posts: TBlogPost[] = rawPosts.map((post) => {
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

    return posts;

  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<TBlogPost | null> {
  const endpoint = `${ensureApiUrl()}/wp/v2/posts?slug=${slug}&_embed`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.statusText}`);
    }

    const rawPosts: TRawWpBlogPost[] = await res.json();
    
    if (rawPosts.length === 0) {
      return null;
    }

    const post = rawPosts[0];
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

  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    throw error;
  }
}

// ========== SITE SETTINGS FUNCTIONS ==========

export async function getSiteSettings(): Promise<TSiteSettings> {
  const endpoint = `${ensureApiUrl()}/wp/v2/site-settings/1`; // Assuming settings have ID 1

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch site settings: ${res.statusText}`);
    }

    const rawSettings: TRawWpSiteSettings = await res.json();

    const settings: TSiteSettings = {
      siteName: rawSettings.acf?.site_name || 'Sirtona',
      siteDescription: rawSettings.acf?.site_description || 'Digital Solutions for Ethiopia',
      logo: {
        url: rawSettings.acf?.logo?.url || '/logo.png',
        altText: rawSettings.acf?.logo?.alt || 'Sirtona Logo',
      },
      contactInfo: {
        email: rawSettings.acf?.contact_email || 'hello@sirtona.com',
        phone: rawSettings.acf?.contact_phone || '+251 911 123 456',
        address: rawSettings.acf?.contact_address || 'Addis Ababa, Ethiopia',
        businessHours: rawSettings.acf?.business_hours || 'Monday - Friday: 9AM - 6PM',
      },
      socialLinks: {
        facebook: rawSettings.acf?.facebook_url || undefined,
        twitter: rawSettings.acf?.twitter_url || undefined,
        linkedin: rawSettings.acf?.linkedin_url || undefined,
        instagram: rawSettings.acf?.instagram_url || undefined,
      },
      currency: {
        symbol: rawSettings.acf?.currency_symbol || 'Br',
        code: rawSettings.acf?.currency_code || 'ETB',
      },
    };

    return settings;

  } catch (error) {
    console.error("Error fetching site settings:", error);
    // Return default settings if API fails
    return {
      siteName: 'Sirtona',
      siteDescription: 'Digital Solutions for Ethiopia',
      logo: {
        url: '/logo.png',
        altText: 'Sirtona Logo',
      },
      contactInfo: {
        email: 'hello@sirtona.com',
        phone: '+251 911 123 456',
        address: 'Addis Ababa, Ethiopia',
        businessHours: 'Monday - Friday: 9AM - 6PM',
      },
      socialLinks: {},
      currency: {
        symbol: 'Br',
        code: 'ETB',
      },
    };
  }
}
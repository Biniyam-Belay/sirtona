// src/types/wordpress.ts

// ========== PROJECT TYPES ==========
// This is the clean, final shape of our project data after we process it.
// Our components will use this simple type.
export type TProject = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    altText: string;
  };
};

// This is an optional but helpful type that represents the raw data
// we get from the WordPress API before we clean it up.
export type TRawWpProject = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  // This `_embedded` property is added when we use the `_embed` query parameter
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
};

// ========== PRICING TYPES ==========
export type TPricingPlan = {
  id: number;
  title: string;
  slug: string;
  price: number;
  period: string;
  features: string[];
  isPopular: boolean;
  description: string;
  ctaText: string;
  ctaUrl: string;
};

export type TRawWpPricingPlan = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    price: string;
    period: string;
    features: string;
    is_popular: boolean;
    description: string;
    cta_text: string;
    cta_url: string;
  };
};

// ========== SERVICE TYPES ==========
export type TService = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  icon: string;
  price?: number;
  features: string[];
  featuredImage: {
    url: string;
    altText: string;
  };
};

export type TRawWpService = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    icon: string;
    price: string;
    features: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
};

// ========== TEAM MEMBER TYPES ==========
export type TTeamMember = {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: {
    url: string;
    altText: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

export type TRawWpTeamMember = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    role: string;
    bio: string;
    linkedin_url: string;
    twitter_url: string;
    email: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
};

// ========== BLOG POST TYPES ==========
export type TBlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  tags?: string[];
};

export type TRawWpBlogPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
    'author'?: {
      name: string;
    }[];
    'wp:term'?: Array<Array<{
      name: string;
      taxonomy: string;
    }>>;
  };
};

// ========== SITE SETTINGS TYPES ==========
export type TSiteSettings = {
  siteName: string;
  siteDescription: string;
  logo: {
    url: string;
    altText: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
};

export type TRawWpSiteSettings = {
  acf?: {
    site_name: string;
    site_description: string;
    logo: {
      url: string;
      alt: string;
    };
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    business_hours: string;
    facebook_url: string;
    twitter_url: string;
    linkedin_url: string;
    instagram_url: string;
    currency_symbol: string;
    currency_code: string;
  };
};
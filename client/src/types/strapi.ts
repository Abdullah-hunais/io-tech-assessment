// src/types/strapi.ts

// Since images are hardcoded for now, IPopulatedMedia is no longer directly used in attributes.
// If you re-enable Strapi images later, remember to add IPopulatedMedia back to the relevant attributes.

// Global Settings Single Type (as per your Footer needs)
export interface GlobalSettingsAttributes {
  Subscribe: string;
  Contacts: string;
  About: string;
  OurServices: string;
  OurStrategy: string;
  OurAdvantages: string;
  SocialResponsibility: string;
  CopyrightText: string;
  // Logo field removed as it's hardcoded in Header
  FacebookLink?: string | null;
  TwitterLink?: string | null;
  LinkedInLink?: string | null;
  InstagramLink?: string | null;
}

// Home Page Single Type (Updated based on your provided JSON)
export interface HomePageAttributes {
  HeroTitle: string;
  HeroDescription: string;
  OurTeam: string;
  OurTeamDes: string;
  TestimonialTitle: string;
  TestimonialDes: string;
  HeroVideoUrl?: string | null; // Still relevant if you plan to dynamically fetch video URLs
  // HeroBackgroundImage and HeroPersonImage fields removed as they are hardcoded
}

// Service Collection Type
export interface ServiceAttributes {
  Title: string;
  Slug: string; // for dynamic routing /services/[slug]
  ShortDescription?: string;
  FullContent?: string;
  IconClass?: string | null;
}

// Team Member Collection Type
export interface TeamMemberAttributes {
  Name: string;
  Role: string;
  // Image field removed as it's hardcoded
  Phone?: string | null;
  Email?: string | null;
  Whatsapp?: string | null;
}

// Client Testimonial Collection Type
export interface ClientTestimonialAttributes {
  ClientName: string;
  ClientRole: string;
  ClientCompany?: string | null;
  Quote: string;
  // ClientImage and ClientLogo fields removed as they are hardcoded
}

// Helper for Strapi API responses (common structure for Single Types)
export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | null;
  meta: any;
}

// Helper for Strapi API responses (common structure for Collection Types)
export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: any;
}

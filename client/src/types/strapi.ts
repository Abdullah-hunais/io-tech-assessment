// src/types/strapi.ts

// This interface describes the attributes of a media item when it's directly populated (e.g., populate[field]=*)
export interface IPopulatedMedia {
  id: number;
  documentId?: string; // Appears in your JSON, optional in older Strapi versions
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  // formats: any; // Can be typed more specifically if needed
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; // This is the crucial URL for the image
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

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
  Logo?: IPopulatedMedia; // Assuming Logo is directly populated
  FacebookLink?: string | null;
  TwitterLink?: string | null;
  LinkedInLink?: string | null;
  InstagramLink?: string | null;
}

// Home Page Single Type (Updated based on your provided JSON and re-adding image fields)
export interface HomePageAttributes {
  HeroTitle: string;
  HeroDescription: string;
  OurTeam: string;
  OurTeamDes: string;
  TestimonialTitle: string;
  TestimonialDes: string;
  HeroBackgroundImage?: IPopulatedMedia; // Re-added
  HeroPersonImage?: IPopulatedMedia; // Re-added
  HeroVideoUrl?: string | null;
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
  Image?: IPopulatedMedia; // Re-added
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
  ClientImage?: IPopulatedMedia; // Re-added
  ClientLogo?: IPopulatedMedia; // Re-added
}

// Helper for Strapi API responses (common structure for Single Types)
export interface StrapiSingleResponse<T> {
  data: any;
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

export interface HeroSection {
  tagKicker: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText?: string;
  urgencyBadge?: string;
  valuePropBullets: string[];
  heroImage?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  context: string;
}

export interface FeatureItem {
  id: string;
  category: string;
  title: string;
  description: string;
  outcomes: string[];
  techStack?: string[];
}

export interface CurriculumModule {
  module: string;
  title: string;
  duration: string;
  topics: string[];
  projectOutcome: string;
}

export interface SocialProofItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  outcomeMetric: string;
}

export interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  period?: string;
  badge?: string;
  popular?: boolean;
  highlights: string[];
  ctaLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ConversionModule {
  headline: string;
  subtitle: string;
  incentiveText: string;
  fields: string[];
  buttonText: string;
  guaranteeText: string;
}

export interface AbVariations {
  variantHeadlineB: string;
  variantHookB: string;
  variantCtaB: string;
  hypothesis: string;
}

export interface ConversionAudit {
  score: number;
  predictedConversionRate: string;
  strengths: string[];
  optimizationOpportunities: string[];
}

export interface LandingPageData {
  campaignId: string;
  campaignName: string;
  brandTone: string;
  targetAudience: string;
  hero: HeroSection;
  metrics: MetricItem[];
  features: FeatureItem[];
  curriculum?: CurriculumModule[];
  socialProof: SocialProofItem[];
  pricingTiers: PricingTier[];
  faq: FaqItem[];
  conversionModule: ConversionModule;
  abVariations: AbVariations;
  conversionAudit: ConversionAudit;
}

export interface LeadRecord {
  id: string;
  campaignId: string;
  email: string;
  name: string;
  role?: string;
  tier?: string;
  submittedAt: string;
}

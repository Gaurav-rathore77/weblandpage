export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  liveUrl?: string;
  isDemo?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "demo-business",
    name: "Business Services Website",
    category: "Business Website",
    description: "Clean, professional website structure suitable for service-based businesses with clear service pages and contact functionality.",
    isDemo: true,
  },
  {
    id: "demo-landing",
    name: "Campaign Landing Page",
    category: "Landing Page",
    description: "Focused landing page layout designed for lead generation with clear call-to-action sections.",
    isDemo: true,
  },
  {
    id: "demo-dashboard",
    name: "Business Dashboard",
    category: "Custom Web Application",
    description: "Admin dashboard concept for managing business data, inquiries, and basic workflow tracking.",
    isDemo: true,
  },
];

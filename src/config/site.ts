export const siteConfig = {
  name: "Weblign",
  title: "Weblign | Website Design & Development for Indian Businesses",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://go.weblign.in").replace(/\/+$/, ""),
  mainUrl: (process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://weblign.in").replace(/\/+$/, ""),
  description:
    "Weblign builds fast, mobile-first business websites, landing pages and custom web applications in India. Transparent pricing from ₹9,999. Get a free quote.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "info.weblign@gmail.com",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  leadApiEndpoint: process.env.NEXT_PUBLIC_LEAD_API_ENDPOINT || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
} as const;

export const getWhatsAppLink = (message: string) => {
  if (!siteConfig.whatsappNumber) {
    return null;
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
};

export const isWhatsAppConfigured = () => {
  return Boolean(siteConfig.whatsappNumber && siteConfig.whatsappNumber.length > 9);
};

export const getEmailLink = () => `mailto:${siteConfig.email}`;

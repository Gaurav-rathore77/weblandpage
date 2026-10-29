'use client';

import { useEffect, useState } from 'react';
import { siteConfig, getWhatsAppLink, isWhatsAppConfigured, getEmailLink } from '@/config/site';
import { validateIndianPhone } from '@/lib/utils';
import { MetaPixel, trackLead, trackWhatsAppClick, trackFormStart } from '@/components/MetaPixel';
import { Logo } from '@/components/Logo';

const inputBase =
  'w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-blue-600 focus:ring-4 focus:ring-blue-100';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function CheckIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function MailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function Eyebrow({
  children,
  icon,
  dark = false,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ' +
        (dark
          ? 'border-white/15 bg-white/10 text-cyan-300'
          : 'border-blue-100 bg-blue-50 text-blue-700')
      }
    >
      <span className={dark ? 'text-cyan-400' : 'text-blue-600'}>{icon}</span>
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  icon,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Eyebrow icon={icon} dark={dark}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={
          'mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ' +
          (dark ? 'text-white' : 'text-slate-900')
        }
      >
        {title}
      </h2>
      <p className={'mt-4 text-base leading-relaxed sm:text-lg ' + (dark ? 'text-slate-300' : 'text-slate-600')}>
        {subtitle}
      </p>
    </div>
  );
}

const faqs = [
  {
    q: 'How much does a business website cost?',
    a: 'The Starter website starts at ₹9,999+ and the Business website at ₹19,999+. Final pricing depends on the pages, features, and integrations you need. You get a written quote before anything starts.',
  },
  {
    q: 'How long does development take?',
    a: 'Timeline depends on scope and complexity. A focused landing page is faster than a multi-page business site. Your estimated timeline is included in the quotation so you know what to expect.',
  },
  {
    q: 'Are domain and hosting included?',
    a: 'Domain and hosting are usually separate from development. We will explain what is needed and the available options in your quotation, then you decide.',
  },
  {
    q: 'Can I request changes after launch?',
    a: 'Yes. Post-launch changes are discussed based on the agreed scope, and any additional work is quoted separately before it begins.',
  },
  {
    q: 'Can you build custom web applications?',
    a: 'Yes. We build dashboards, internal tools, and custom web applications around your specific workflow, with requirements planning before development.',
  },
  {
    q: 'How does payment work?',
    a: 'Payment terms are discussed and agreed before development starts, and they are written into the project quotation. There are no surprise charges.',
  },
  {
    q: 'Do you provide maintenance?',
    a: 'Maintenance options can be arranged based on your needs. The details are confirmed in the project agreement so both sides know what is covered.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill in the quote form at the top of this page or message us on WhatsApp. We will discuss your requirements and send a transparent quotation.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/brand/logo-512.png`,
        width: 512,
        height: 512,
      },
      image: `${siteConfig.url}/og-image.png`,
      email: siteConfig.email,
      ...(siteConfig.whatsappNumber ? { telephone: `+${siteConfig.whatsappNumber}` } : {}),
      description:
        'Weblign designs and builds fast, mobile-first business websites, landing pages, and custom web applications for businesses in India.',
      areaServed: { '@type': 'Country', name: 'India' },
      priceRange: '₹9,999+',
      serviceType: [
        'Business Website Development',
        'Landing Page Design',
        'Custom Web Application Development',
        'Website Redesign',
      ],
      sameAs: [siteConfig.mainUrl],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.email,
        ...(siteConfig.whatsappNumber ? { telephone: `+${siteConfig.whatsappNumber}` } : {}),
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Website development services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Starter Website',
            description: 'A focused website for new businesses that need a credible online presence.',
            url: `${siteConfig.url}/#pricing`,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '9999',
              priceCurrency: 'INR',
            },
            itemOffered: {
              '@type': 'Service',
              name: 'Business Website Development',
            },
          },
          {
            '@type': 'Offer',
            name: 'Business Website',
            description: 'A larger website for established businesses that need more pages and features.',
            url: `${siteConfig.url}/#pricing`,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '19999',
              priceCurrency: 'INR',
            },
            itemOffered: {
              '@type': 'Service',
              name: 'Business Website Development',
            },
          },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${siteConfig.url}/#custom-web-apps`,
      name: 'Custom Web Application Development',
      description:
        'Dashboards, client portals and internal tools quoted after a requirements review.',
      provider: { '@id': `${siteConfig.url}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
      serviceType: 'Custom Web Application Development',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${siteConfig.url}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.png`,
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/#faq`,
      isPartOf: { '@id': `${siteConfig.url}/#webpage` },
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: '',
    businessName: '',
    budget: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formStarted, setFormStarted] = useState(false);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your WhatsApp number';
    } else if (!validateIndianPhone(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.service) {
      errors.service = 'Please select the service you need';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildLeadSummary = () =>
    [
      `Name: ${formData.fullName}`,
      `Phone / WhatsApp: ${formData.phone}`,
      `Service: ${formData.service}`,
      formData.businessName ? `Business: ${formData.businessName}` : '',
      formData.budget ? `Budget: ${formData.budget}` : '',
      formData.description ? `Project details: ${formData.description}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (siteConfig.leadApiEndpoint) {
        const response = await fetch(siteConfig.leadApiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            source: 'meta-landing',
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) throw new Error('Request failed');
        setDelivered(true);
        setFormSubmitted(true);
        trackLead();
      } else {
        // No backend configured yet: show the enquiry details step so the lead is not lost.
        setDelivered(false);
        setFormSubmitted(true);
        trackLead();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('We could not submit the form. Please try again or contact us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = (message: string) => {
    trackWhatsAppClick();
    const link = getWhatsAppLink(message);
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    const subject = encodeURIComponent('Website enquiry');
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  };

  const getLeadMailto = () => {
    const subject = encodeURIComponent(`Website enquiry from ${formData.fullName || 'a new lead'}`);
    return `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(buildLeadSummary())}`;
  };

  return (
    <>
      <MetaPixel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <main className="min-h-screen bg-white">
        {/* ================= HEADER ================= */}
        <header className="fixed inset-x-0 top-0 z-50">
          <div className="bg-blue-600 text-white">
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-[11px] font-semibold tracking-wide sm:text-xs">
              <svg className="h-3.5 w-3.5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Free consultation</span>
              <span className="text-blue-200">•</span>
              <span>Transparent quotation</span>
              <span className="hidden text-blue-200 sm:inline">•</span>
              <span className="hidden sm:inline">No hidden charges</span>
            </div>
          </div>

          <div className="border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between lg:h-[72px]">
                <a href="#home" aria-label="Weblign home" className="flex items-center">
                  <Logo />
                </a>

                <div className="hidden items-center gap-8 lg:flex">
                  <a href="#work" className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                    Our Work
                  </a>
                  <a href="#services" className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                    Services
                  </a>
                  <a href="#pricing" className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                    Pricing
                  </a>
                  <a href="#faq" className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
                    FAQ
                  </a>
                  <a
                    href={getEmailLink()}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                  >
                    <MailIcon className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    Get Free Quote
                    <ArrowIcon />
                  </a>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </nav>

            {mobileMenuOpen && (
              <div className="border-t border-white/10 bg-slate-950/95 px-4 pb-5 pt-2 lg:hidden">
                <div className="space-y-1">
                  {[
                    { href: '#work', label: 'Our Work' },
                    { href: '#services', label: 'Services' },
                    { href: '#who-its-for', label: "Who it's for" },
                    { href: '#included', label: "What's included" },
                    { href: '#pricing', label: 'Pricing' },
                    { href: '#faq', label: 'FAQ' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#enquiry-form"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Get Free Quote
                  </a>
                  <a
                    href={getEmailLink()}
                    className="mt-2 flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-400"
                  >
                    <MailIcon className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section id="home" className="relative overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
            <picture className="block h-full w-full">
              <source
                type="image/webp"
                srcSet="/hero-bg-alt-960.webp 960w, /hero-bg-alt-1440.webp 1440w, /hero-bg-alt.webp 1920w"
                sizes="100vw"
              />
              <img
                src="/hero-bg-alt.jpg"
                alt=""
                width={1920}
                height={1280}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center opacity-40"
              />
            </picture>
            <div className="absolute inset-0 bg-slate-950/80"></div>
            <div className="absolute -right-56 top-24 hidden h-[620px] w-[620px] rounded-full border border-white/10 lg:block"></div>
            <div className="absolute -right-24 top-52 hidden h-[360px] w-[360px] rounded-full border border-white/10 lg:block"></div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
            <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              {/* Copy */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                  </span>
                  Taking on new projects
                </div>

                <h1 className="text-[2.4rem] font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl">
                  Stop losing leads
                  <span className="mt-2 block text-cyan-400">to a weak website.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  We design and build fast, mobile-first websites and landing pages that turn ad
                  clicks into real enquiries. Clear structure, clear messaging, clear next step.
                </p>

                <div className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {['Mobile-first design', 'Fast loading pages', 'Lead-focused layout', 'Transparent pricing'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        {item}
                      </div>
                    )
                  )}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700 lg:px-5 lg:text-[15px] xl:px-7 xl:text-base"
                  >
                    Get My Free Quote
                    <ArrowIcon className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() =>
                      openWhatsApp('Hi Weblign, I came from your Meta Ad and want to discuss my website requirements.')
                    }
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white/10 lg:px-5 lg:text-[15px] xl:px-7 xl:text-base"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-green-400" />
                    Chat on WhatsApp
                  </button>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Reply within 24 hours
                  </span>
                  <a
                    href={getEmailLink()}
                    className="flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    <MailIcon className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </div>

                <div className="mt-10 hidden items-center gap-3 sm:flex">
                  {[
                    { step: '01', label: 'Share details' },
                    { step: '02', label: 'Get a quote' },
                    { step: '03', label: 'Start building' },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[11px] font-bold text-cyan-400">
                          {item.step}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                      </div>
                      {i < 2 && <span className="h-px w-6 bg-white/20"></span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div id="enquiry-form" className="scroll-mt-32">
                <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 lg:ml-auto">
                  <div className="bg-blue-600 px-6 py-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-white">Get a Free Quote</h2>
                        <p className="text-xs font-medium text-blue-50">Takes less than 60 seconds</p>
                      </div>
                    </div>
                  </div>

                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} onFocus={handleFormStart} className="space-y-4 p-6">
                      <div>
                        <label htmlFor="heroFullName" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700">
                          Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="heroFullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          autoComplete="name"
                          placeholder="e.g. Rahul Sharma"
                          className={inputBase + ' ' + (formErrors.fullName ? 'border-red-400' : 'border-slate-200')}
                          aria-invalid={!!formErrors.fullName}
                        />
                        {formErrors.fullName && <p className="mt-1 text-xs font-medium text-red-600">{formErrors.fullName}</p>}
                      </div>

                      <div>
                        <label htmlFor="heroPhone" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700">
                          WhatsApp number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="heroPhone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          inputMode="numeric"
                          placeholder="10-digit mobile number"
                          className={inputBase + ' ' + (formErrors.phone ? 'border-red-400' : 'border-slate-200')}
                          aria-invalid={!!formErrors.phone}
                        />
                        {formErrors.phone && <p className="mt-1 text-xs font-medium text-red-600">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="heroService" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700">
                          Service required <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="heroService"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={
                            inputBase +
                            ' bg-white ' +
                            (formErrors.service ? 'border-red-400' : 'border-slate-200')
                          }
                          aria-invalid={!!formErrors.service}
                        >
                          <option value="">Select a service</option>
                          <option value="Business Website">Business Website</option>
                          <option value="Landing Page">Landing Page for Ads</option>
                          <option value="Custom Web Application">Custom Web Application</option>
                          <option value="Website Redesign">Website Redesign</option>
                          <option value="Not Sure Yet">Not sure yet</option>
                        </select>
                        {formErrors.service && <p className="mt-1 text-xs font-medium text-red-600">{formErrors.service}</p>}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowOptional(!showOptional)}
                        className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-xs font-bold text-blue-700 transition-colors hover:text-blue-800"
                        aria-expanded={showOptional}
                      >
                        <span>Add more details (optional)</span>
                        <svg
                          className={
                            'h-4 w-4 transition-transform ' + (showOptional ? 'rotate-180' : '')
                          }
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showOptional && (
                        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div>
                            <label htmlFor="heroBusiness" className="mb-1.5 block text-xs font-semibold text-slate-700">
                              Business name
                            </label>
                            <input
                              type="text"
                              id="heroBusiness"
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleChange}
                              autoComplete="organization"
                              placeholder="Your business name"
                              className={inputBase + ' border-slate-200'}
                            />
                          </div>
                          <div>
                            <label htmlFor="heroBudget" className="mb-1.5 block text-xs font-semibold text-slate-700">
                              Approximate budget
                            </label>
                            <select
                              id="heroBudget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className={inputBase + ' border-slate-200 bg-white'}
                            >
                              <option value="">Select a range</option>
                              <option value="Under ₹10,000">Under ₹10,000</option>
                              <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                              <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000</option>
                              <option value="₹50,000+">₹50,000+</option>
                              <option value="Need guidance">Need guidance</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="heroDescription" className="mb-1.5 block text-xs font-semibold text-slate-700">
                              Project details
                            </label>
                            <textarea
                              id="heroDescription"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              rows={3}
                              placeholder="What do you need help with?"
                              className={inputBase + ' resize-none border-slate-200'}
                            ></textarea>
                          </div>
                        </div>
                      )}

                      {submitError && (
                        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? 'Sending...' : 'Get Free Quote Now'}
                        {!isSubmitting && <ArrowIcon className="h-5 w-5" />}
                      </button>

                      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-slate-500">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your details stay private. No spam.
                      </p>
                    </form>
                  ) : (
                    <div className="p-7 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {delivered ? 'Enquiry received' : 'One last step'}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {delivered
                          ? 'Thanks for reaching out. We will review your details and contact you within 24 hours.'
                          : 'Your details are ready. Send them to us on WhatsApp or email and we will reply within 24 hours.'}
                      </p>

                      <div className="mt-5 space-y-2">
                        {isWhatsAppConfigured() && (
                          <button
                            onClick={() => openWhatsApp(buildLeadSummary())}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-800"
                          >
                            <WhatsAppIcon className="h-5 w-5" />
                            Send on WhatsApp
                          </button>
                        )}
                        <a
                          href={getLeadMailto()}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
                        >
                          <MailIcon className="h-5 w-5" />
                          Send by email
                        </a>
                      </div>

                      <p className="mt-4 text-xs font-medium text-slate-500">
                        Or write to {siteConfig.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CAPABILITY STRIP ================= */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Technologies we work with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'].map((tech) => (
                <span key={tech} className="text-sm font-bold text-slate-500 transition-colors hover:text-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM / SOLUTION ================= */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Why it matters"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="A weak website quietly costs you customers"
              subtitle="You do not always see the lost enquiries. You just see fewer of them. Here is the difference professional website design makes."
            />

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="h-1.5 w-full bg-red-500"></div>
                <div className="p-7 sm:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <XIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600">The problem</p>
                      <h3 className="text-xl font-bold text-slate-900">Without a proper website</h3>
                    </div>
                  </div>
                  <ul className="space-y-3.5">
                    {[
                      'Visitors leave because the site looks outdated or untrustworthy',
                      'Ad clicks arrive on a page with no clear next step',
                      'Your best work is hard to find and hard to understand',
                      'Mobile visitors struggle to read, scroll, or contact you',
                      'Every question turns into a long back-and-forth',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <XIcon className="h-3 w-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                <div className="h-1.5 w-full bg-green-500"></div>
                <div className="p-7 sm:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <CheckIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">The solution</p>
                      <h3 className="text-xl font-bold text-slate-900">With Weblign</h3>
                    </div>
                  </div>
                  <ul className="space-y-3.5">
                    {[
                      'A clean, professional site that builds instant trust',
                      'One obvious next step on every page and every screen',
                      'Services and results presented in a way buyers understand',
                      'Mobile-first layout that is effortless to use',
                      'Enquiry forms and WhatsApp that make contact one tap away',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#enquiry-form"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-800"
                  >
                    Get a quote for your website
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WORK ================= */}
        <section id="work" className="scroll-mt-28 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Selected work"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="A glimpse of what we can build"
              subtitle="Concept previews that show the structure and quality you can expect. Real client projects will be added as they go live."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: 'Business Services Website',
                  category: 'Business Website',
                  image: '/work-1.jpg',
                  description:
                    'A clear, credible structure for service businesses — services, proof points, and a direct enquiry path.',
                },
                {
                  name: 'Campaign Landing Page',
                  category: 'Landing Page',
                  image: '/work-2.jpg',
                  description:
                    'A focused layout built around one action, designed to make paid traffic convert instead of bounce.',
                },
                {
                  name: 'Business Dashboard',
                  category: 'Web Application',
                  image: '/work-3.jpg',
                  description:
                    'A functional admin concept for managing enquiries, data, and day-to-day business workflows.',
                },
              ].map((project) => (
                <article
                  key={project.name}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={project.name}
                      width={800}
                      height={533}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/30"></div>
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white">
                        {project.category}
                      </span>
                      <span className="rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-amber-300">
                        Demo concept
                      </span>
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                      {project.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                    <a
                      href="#enquiry-form"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Build something like this
                      <ArrowIcon className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                Want something similar? Get a quote
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="scroll-mt-28 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Our services"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Websites built for one job: getting enquiries"
              subtitle="Business website development, high-converting landing pages and custom web applications. Pick the solution that matches where your business is today. Not sure? Tell us your goal and we will recommend the right option."
            />

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {[
                {
                  title: 'Business Websites',
                  ideal: 'Service businesses, professionals, local brands',
                  color: 'blue',
                  icon: (
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  items: ['Responsive design', 'Up to 5 core pages', 'Service and about pages', 'Contact form setup', 'Basic on-page SEO'],
                },
                {
                  title: 'Landing Pages',
                  ideal: 'Meta and Google Ads, campaigns, launches',
                  color: 'purple',
                  icon: (
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  items: ['High-converting layout', 'Clear call-to-action', 'Lead capture form', 'Fast loading', 'Meta Pixel ready'],
                },
                {
                  title: 'Custom Web Applications',
                  ideal: 'Dashboards, internal tools, custom workflows',
                  color: 'orange',
                  icon: (
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  ),
                  items: ['Requirement planning', 'Custom functionality', 'Admin dashboard', 'Data management', 'Scalable architecture'],
                },
              ].map((service) => {
                const accent =
                  service.color === 'blue'
                    ? { bar: 'bg-blue-600', tile: 'bg-blue-600', text: 'text-blue-600' }
                    : service.color === 'purple'
                    ? { bar: 'bg-purple-600', tile: 'bg-purple-600', text: 'text-purple-600' }
                    : { bar: 'bg-orange-500', tile: 'bg-orange-500', text: 'text-orange-600' };

                return (
                  <article
                    key={service.title}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                    <div className={'h-1.5 w-full ' + accent.bar}></div>
                    <div className="flex flex-grow flex-col p-7">
                      <span
                        className={
                          'mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 ' +
                          accent.tile
                        }
                      >
                        {service.icon}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Best for
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{service.ideal}</p>

                      <ul className="mt-6 flex-grow space-y-2.5 border-t border-slate-100 pt-5">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                              <CheckIcon className="h-2.5 w-2.5" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#enquiry-form"
                        className={
                          'mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white'
                        }
                      >
                        Get a quote
                        <ArrowIcon />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= WHO IT'S FOR ================= */}
        <section id="who-its-for" className="scroll-mt-28 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Who it's for"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3m-6 3a3 3 0 10-3-3" />
                </svg>
              }
              title="Built around the way your business gets enquiries"
              subtitle="Different industries need different proof. The common thread is a clear offer, a credible page, and an obvious next step."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Clinics & consultants',
                  text: 'Clear services, credible profiles, and an appointment or WhatsApp path that takes seconds.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
                    </svg>
                  ),
                },
                {
                  title: 'Real estate & interiors',
                  text: 'Project galleries, location details, and a short enquiry flow for high-intent buyers.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 11.5L12 4l9 7.5M5.5 10v10h13V10M9.5 20v-6h5v6" />
                    </svg>
                  ),
                },
                {
                  title: 'Coaches & creators',
                  text: 'Program pages, real proof, and a simple way to book a call without a long funnel.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Local service businesses',
                  text: 'Service-area pages, click-to-call, and fast mobile pages for people ready to hire.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                  ),
                },
                {
                  title: 'D2C & retail brands',
                  text: 'Product storytelling, offer pages, and a clean route to order or enquire.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  ),
                },
                {
                  title: 'B2B & professional services',
                  text: 'Credibility, case studies, and a lead form that filters serious enquiries.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
              ].map((audience) => (
                <article
                  key={audience.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    {audience.icon}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{audience.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-7 text-center">
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-bold text-slate-900">Not on the list?</span> If your business
                runs on enquiries, we can still help.
              </p>
              <a
                href="#enquiry-form"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                Tell us about your business
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ================= WHAT'S INCLUDED ================= */}
        <section id="included" className="scroll-mt-28 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="lg:order-2">
                <Eyebrow
                  icon={
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                >
                  Included by default
                </Eyebrow>
                <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  The essentials are included, not upsold.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Every project starts with the same foundation, whether you choose Starter,
                  Business, or a custom build. These are the things a website needs to actually
                  work after launch.
                </p>

                <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {[
                    {
                      title: 'Mobile-first design',
                      text: 'Built for the screen where most ad clicks land.',
                    },
                    {
                      title: 'On-page SEO setup',
                      text: 'Clean titles, headings, metadata, and a sitemap.',
                    },
                    {
                      title: 'Speed optimisation',
                      text: 'Compressed images, lean code, and fast hosting.',
                    },
                    {
                      title: 'Lead capture built in',
                      text: 'Enquiry forms, WhatsApp, and click-to-call.',
                    },
                    {
                      title: 'Tracking ready',
                      text: 'Meta Pixel and conversion events, once you add the ID.',
                    },
                    {
                      title: 'Clear handover',
                      text: 'A walkthrough of what you own and how it works.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    <span className="font-bold text-slate-900">Need something outside the scope?</span>{' '}
                    You get a written quote before any additional work starts.
                  </span>
                </p>
              </div>

              <div className="lg:order-1">
                <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                  <div
                    role="img"
                    aria-label="Illustration of a Weblign website layout with a clear headline, a simple offer, and an enquiry form."
                    className="relative"
                  >
                    <div className="absolute -right-3 top-10 z-10 hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg sm:flex">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 text-green-700">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900">One clear action</p>
                        <p className="text-[10px] text-slate-500">No menu maze</p>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                        <span className="ml-3 flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-[10px] font-medium text-slate-500">
                          yourbusiness.in
                        </span>
                      </div>

                      <div className="bg-slate-950 p-5 sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[10px] font-black text-white">
                              Y
                            </span>
                            <span className="text-xs font-bold text-white">Your Business</span>
                          </div>
                          <span className="rounded-md border border-white/15 px-2.5 py-1 text-[9px] font-bold text-slate-200">
                            Call now
                          </span>
                        </div>

                        <div className="mt-7 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                          <div>
                            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                              Clear offer
                            </span>
                            <p className="mt-3 text-lg font-black leading-[1.15] text-white sm:text-xl">
                              Tell visitors what you do, who it is for, and why you.
                            </p>
                            <p className="mt-2.5 text-[10px] leading-relaxed text-slate-400">
                              Short supporting copy that answers the first objection.
                            </p>
                            <div className="mt-4 flex gap-2">
                              <span className="rounded-md bg-blue-600 px-3 py-1.5 text-[9px] font-bold text-white">
                                Get a quote
                              </span>
                              <span className="rounded-md border border-white/20 px-3 py-1.5 text-[9px] font-bold text-slate-100">
                                WhatsApp
                              </span>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white p-3">
                            <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
                              Quick enquiry
                            </p>
                            <div className="mt-2 space-y-1.5">
                              <div className="h-5 rounded border border-slate-200 bg-slate-50"></div>
                              <div className="h-5 rounded border border-slate-200 bg-slate-50"></div>
                              <div className="h-5 rounded border border-slate-200 bg-slate-50"></div>
                              <div className="flex h-6 items-center justify-center rounded bg-blue-600 text-[8px] font-bold text-white">
                                Send enquiry
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                          {['Fast on mobile', 'Clear pricing', 'Real proof'].map((item) => (
                            <div
                              key={item}
                              className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center text-[8px] font-semibold text-slate-300"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-5 left-4 z-10 hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg sm:flex">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900">Fast by default</p>
                        <p className="text-[10px] text-slate-500">Lean images, clean code</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-9 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Layout preview, not a client project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section id="pricing" className="scroll-mt-28 bg-slate-950 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              dark
              eyebrow="Pricing"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Simple, transparent pricing"
              subtitle="Clear starting prices, no hidden charges. Your final quote depends only on the scope you choose."
            />

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {[
                {
                  name: 'Starter Website',
                  price: '₹9,999',
                  suffix: '+',
                  blurb: 'For small businesses and a clean online presence',
                  features: ['Responsive design', 'Up to 5 core pages', 'Contact form integration', 'Basic on-page SEO', 'Mobile optimized'],
                  popular: false,
                  accent: 'bg-slate-400',
                },
                {
                  name: 'Business Website',
                  price: '₹19,999',
                  suffix: '+',
                  blurb: 'For businesses that need a complete, conversion-ready site',
                  features: ['Multi-page design', 'Responsive and mobile-first', 'Contact and enquiry forms', 'SEO foundations', 'Integrations included', 'Content upload'],
                  popular: true,
                  accent: 'bg-blue-600',
                },
                {
                  name: 'Custom Web App',
                  price: 'Custom',
                  suffix: '',
                  blurb: 'For dashboards, tools, and requirement-based projects',
                  features: ['Requirements planning', 'Custom functionality', 'Admin dashboard', 'Data management', 'Scalable architecture', 'Milestone-based delivery'],
                  popular: false,
                  accent: 'bg-purple-500',
                },
              ].map((plan) => (
                <article
                  key={plan.name}
                  className={
                    'relative flex flex-col overflow-hidden rounded-2xl bg-white ' +
                    (plan.popular
                      ? 'ring-2 ring-blue-500 lg:-mt-3 lg:mb-3'
                      : 'ring-1 ring-white/10')
                  }
                >
                  <div className={'h-1.5 w-full ' + plan.accent}></div>
                  {plan.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Recommended
                    </div>
                  )}
                  <div className="flex flex-grow flex-col p-7">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl font-black tracking-tight text-slate-900">{plan.price}</span>
                      {plan.suffix && <span className="pb-1 text-2xl font-bold text-slate-400">{plan.suffix}</span>}
                    </div>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {plan.price === 'Custom' ? 'Based on requirements' : 'Starting price'}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{plan.blurb}</p>

                    <ul className="mt-6 flex-grow space-y-2.5 border-t border-slate-100 pt-5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <CheckIcon className="h-2.5 w-2.5" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          plan.price === 'Custom'
                            ? 'Hi Weblign, I am interested in a Custom Web Application. Please share the next steps.'
                            : `Hi Weblign, I am interested in the ${plan.name} (${plan.price}${plan.suffix}). Please share the next steps.`
                        )
                      }
                      className={
                        'mt-7 w-full rounded-xl px-5 py-3.5 text-sm font-bold transition-colors ' +
                        (plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                      }
                    >
                      Get a quote
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm text-slate-300">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Final pricing depends on requirements, scope, and integrations. A free consultation is included.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHY US ================= */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Why choose us"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Why businesses choose Weblign"
              subtitle="No agency layers, no vague promises. Just clear work, clear pricing, and direct communication."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Direct communication',
                  desc: 'Talk directly with the person building your website. No account managers, no telephone game.',
                  color: 'bg-blue-600',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  ),
                },
                {
                  title: 'Clear project scope',
                  desc: 'You know exactly what is included before work starts, so there are no surprises later.',
                  color: 'bg-purple-600',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  ),
                },
                {
                  title: 'Transparent quotations',
                  desc: 'A written quote with a clear breakdown. No hidden charges added halfway through.',
                  color: 'bg-orange-500',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                },
                {
                  title: 'Mobile-first development',
                  desc: 'Most of your visitors will be on a phone. We design for that screen first, not as an afterthought.',
                  color: 'bg-green-700',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  ),
                },
                {
                  title: 'Practical technology',
                  desc: 'We choose tools that fit your project and are easy to maintain, not whatever is trending.',
                  color: 'bg-indigo-600',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                },
                {
                  title: 'Defined milestones',
                  desc: 'Agreed checkpoints keep the project moving and make progress easy to see.',
                  color: 'bg-amber-500',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <span
                    className={
                      'mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 ' +
                      item.color
                    }
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="How it works"
              icon={
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              }
              title="From first message to launch"
              subtitle="A straightforward four-step process with no mystery and no endless waiting."
            />

            <div className="relative grid gap-8 md:grid-cols-4 md:gap-6">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-300 md:block"></div>

              {[
                {
                  step: '01',
                  title: 'Share your requirement',
                  desc: 'Tell us about your business, your goal, and what you need the website to do.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  ),
                },
                {
                  step: '02',
                  title: 'Get a clear quote',
                  desc: 'We review the details and send a transparent quotation with the full scope.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  ),
                },
                {
                  step: '03',
                  title: 'Approve and build',
                  desc: 'Once the scope is approved, development begins with agreed milestones.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                },
                {
                  step: '04',
                  title: 'Review and launch',
                  desc: 'You review the finished site, we fine-tune the details, and then it goes live.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="relative z-10 text-center">
                  <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {item.icon}
                    </svg>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-50 bg-slate-900 text-[10px] font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-600"
              >
                Start with step one
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="scroll-mt-28 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Eyebrow
                  icon={
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  FAQ
                </Eyebrow>
                <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  Questions, answered
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Still unsure about something? Send a message and we will give you a straight answer,
                  not a sales pitch.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-bold text-slate-900">Prefer to talk first?</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Ask your question on WhatsApp or email. We reply within 24 hours.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <button
                      onClick={() => openWhatsApp('Hi Weblign, I have a question about your website services.')}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-800"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Ask on WhatsApp
                    </button>
                    <a
                      href={getEmailLink()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100"
                    >
                      <MailIcon className="h-4 w-4" />
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-slate-300 open:border-blue-200"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-sm font-bold text-slate-900 transition-colors hover:text-blue-700 sm:text-base">
                      <span>{faq.q}</span>
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-180 group-open:border-blue-200 group-open:bg-blue-50 group-open:text-blue-600">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section id="contact" className="scroll-mt-28 bg-slate-950 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 px-6 py-14 text-center sm:px-12 lg:px-16">
              <div className="pointer-events-none absolute -right-24 -top-24 hidden h-64 w-64 rounded-full border border-white/10 sm:block"></div>
              <div className="pointer-events-none absolute -bottom-24 -left-24 hidden h-64 w-64 rounded-full border border-white/10 sm:block"></div>

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                  Ready when you are
                </span>
                <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Let us build a website that earns its keep.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                  Share your requirement and get a clear, no-obligation quotation. If we are not the
                  right fit, we will tell you that too.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    Get My Free Quote
                    <ArrowIcon className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => openWhatsApp('Hi Weblign, I want to discuss my website requirements.')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-green-800"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </button>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-slate-400 sm:flex-row sm:gap-6">
                  <a href={getEmailLink()} className="flex items-center gap-2 transition-colors hover:text-cyan-400">
                    <MailIcon className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                  <span className="hidden text-slate-700 sm:inline">|</span>
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Reply within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/10 bg-slate-950 pb-28 pt-16 text-white lg:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <a href="#home" aria-label="Weblign home" className="inline-flex">
                  <Logo markClassName="h-10" />
                </a>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                  Website design and development for Indian businesses — business websites,
                  landing pages and custom web applications that turn visitors into enquiries.
                </p>
                <div className="mt-6 flex gap-2.5">
                  <a
                    href={getEmailLink()}
                    aria-label="Email Weblign"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    <MailIcon className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => openWhatsApp('Hi Weblign, I would like to discuss a website project.')}
                    aria-label="WhatsApp Weblign"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </button>
                  <a
                    href={siteConfig.mainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Weblign main website"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white">Quick links</h3>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { href: '#work', label: 'Our Work' },
                    { href: '#services', label: 'Services' },
                    { href: '#who-its-for', label: "Who it's for" },
                    { href: '#included', label: "What's included" },
                    { href: '#pricing', label: 'Pricing' },
                    { href: '#faq', label: 'FAQ' },
                    { href: '#enquiry-form', label: 'Get a Quote' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-slate-400 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white">Services</h3>
                <ul className="space-y-2.5 text-sm">
                  {['Business Websites', 'Landing Pages', 'Custom Web Apps', 'Website Redesign'].map((item) => (
                    <li key={item}>
                      <a href="#services" className="text-slate-400 transition-colors hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white">Get in touch</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li>
                    <a href={getEmailLink()} className="flex items-center gap-2.5 transition-colors hover:text-white">
                      <MailIcon className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="h-4 w-4 flex-shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    India
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="h-4 w-4 flex-shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a href={siteConfig.mainUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                      weblign.in
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
              <p className="text-xs text-slate-400">2026 Weblign. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <a href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</a>
                <a href="/terms-of-service" className="transition-colors hover:text-white">Terms of Service</a>
                <a href="/cookies-policy" className="transition-colors hover:text-white">Cookies Policy</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ================= DESKTOP WHATSAPP ================= */}
        <button
          onClick={() => openWhatsApp('Hi Weblign, I want a website for my business. Please share the details.')}
          aria-label="Chat with Weblign on WhatsApp"
          aria-hidden={!showFab}
          tabIndex={showFab ? 0 : -1}
          className={
            'fixed bottom-7 right-7 z-40 hidden items-center gap-2 rounded-full bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-green-800 lg:inline-flex ' +
            (showFab ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')
          }
        >
          <WhatsAppIcon className="h-5 w-5" />
          Chat on WhatsApp
        </button>

        {/* ================= MOBILE STICKY CTA ================= */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pb-3 pt-2.5 backdrop-blur lg:hidden">
          <div className="flex gap-2.5">
            <button
              onClick={() => openWhatsApp('Hi Weblign, I want a website for my business. Please share the details.')}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-green-700 px-3 py-3 text-sm font-bold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </button>
            <a
              href="#enquiry-form"
              className="flex flex-[1.35] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white"
            >
              Get Free Quote
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

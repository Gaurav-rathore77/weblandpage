import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Cookies Policy | Weblign",
  description: "Cookies Policy for Weblign - how we use cookies on our website.",
  alternates: {
    canonical: "/cookies-policy",
  },
};

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Weblign home" className="inline-flex">
            <Logo variant="light" />
          </Link>
          <Link
            href="/#enquiry-form"
            className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 sm:inline-flex"
          >
            Get a free quote
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Cookies Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: 29 October 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">1. What Are Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">2. How We Use Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Weblign uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as form submissions and navigation.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website, so we can improve it.</li>
              <li><strong>Advertising Cookies:</strong> Used by Meta Pixel and other advertising platforms to measure the effectiveness of our ads and show relevant advertisements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">3. Third-Party Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              We may use third-party services that set their own cookies on your device. These include Meta Pixel (Facebook/Instagram advertising) and analytics tools. These third parties may use cookies to collect information about your online activities across different websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">4. Managing Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>View cookies stored on your device</li>
              <li>Delete cookies individually or all at once</li>
              <li>Block cookies from specific or all websites</li>
              <li>Set preferences for cookie acceptance</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              Please note that disabling cookies may affect the functionality of our website, including form submissions and other interactive features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">5. Cookie Duration</h2>
            <p className="text-slate-600 leading-relaxed">
              Some cookies are session-based and expire when you close your browser. Others are persistent and remain on your device for a set period or until you delete them manually.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">6. Updates to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in our practices or for legal reasons. Please check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">7. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p className="text-slate-900 font-medium mt-2">
              Email: <a href="mailto:info.weblign@gmail.com" className="text-blue-600 hover:underline">info.weblign@gmail.com</a>
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

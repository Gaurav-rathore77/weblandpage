import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy | Weblign",
  description: "Privacy Policy for Weblign - how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: 29 October 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Weblign (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or contact us for our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              We may collect the following information when you submit an enquiry form or contact us:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Full name</li>
              <li>Phone number / WhatsApp number</li>
              <li>Business name</li>
              <li>Service requirements</li>
              <li>Project budget and description</li>
              <li>Email address (if provided)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              We use the information you provide to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Respond to your enquiries and provide quotations</li>
              <li>Discuss your project requirements</li>
              <li>Communicate about our services</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">4. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">5. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may use cookies to improve user experience. Cookies are small files stored on your device. You can choose to disable cookies through your browser settings, but this may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">6. Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              We may use third-party services such as Meta Pixel for advertising and analytics. These services may collect information about your browsing behavior. Please refer to their respective privacy policies for more details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">7. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us at info.weblign@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">8. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">9. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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

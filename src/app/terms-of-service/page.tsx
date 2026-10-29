import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Terms of Service | Weblign",
  description: "Terms of Service for Weblign - terms and conditions for using our website and services.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfService() {
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
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last updated: 29 October 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using the Weblign website (weblign.in), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">2. Services</h2>
            <p className="text-slate-600 leading-relaxed">
              Weblign provides web development services including business website development, landing page development, custom web applications, and related services. All services are subject to a separate project agreement or quotation confirmed before development begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">3. Pricing and Payment</h2>
            <p className="text-slate-600 leading-relaxed">
              Prices displayed on our website are indicative starting prices. Final pricing depends on project requirements, scope, and integrations. Payment terms will be discussed and agreed upon before starting development, as specified in the project quotation. All prices are in Indian Rupees (INR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">4. Project Scope and Delivery</h2>
            <p className="text-slate-600 leading-relaxed">
              Project scope, deliverables, and timelines will be clearly defined in the project quotation before development begins. Any changes to the scope after approval may result in additional costs and timeline adjustments. We will communicate any such changes before proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">5. Client Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              The client is responsible for:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Providing accurate and complete project requirements</li>
              <li>Supplying necessary content, images, and materials in a timely manner</li>
              <li>Reviewing and providing feedback within agreed timeframes</li>
              <li>Making payments as per the agreed schedule</li>
              <li>Providing access to any third-party services required (hosting, domain, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">6. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              Upon full payment, the client receives ownership of the final website or application. Weblign retains the right to use project screenshots or descriptions in our portfolio unless otherwise agreed. Third-party libraries, frameworks, and tools used in development remain subject to their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">7. Revisions and Changes</h2>
            <p className="text-slate-600 leading-relaxed">
              Revisions are included as per the agreed project scope. Additional revisions or changes beyond the agreed scope may incur additional charges. Post-launch changes are discussed based on the specific requirements and are quoted separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">8. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              Weblign shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific project in question. We do not guarantee specific business outcomes, revenue growth, or search engine rankings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">9. Domain and Hosting</h2>
            <p className="text-slate-600 leading-relaxed">
              Domain registration and hosting services are typically separate from website development. The client is responsible for purchasing and maintaining their own domain and hosting unless otherwise agreed. We can provide guidance on suitable options.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">10. Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              Either party may terminate the project agreement with written notice. In case of termination, payment is due for work completed up to the termination date. Refunds, if applicable, will be determined based on the work completed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">11. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the jurisdiction of the courts in India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-slate-900">12. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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

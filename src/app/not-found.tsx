import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found | Weblign",
  description: "The page you are looking for could not be found. Return to the Weblign homepage or request a free quote.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Weblign home" className="inline-flex">
            <Logo />
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
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-40 top-10 hidden h-[420px] w-[420px] rounded-full border border-white/10 sm:block"></div>
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">
            404 — Page not found
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            This page took a wrong turn.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            The link may be broken or the page may have moved. Head back home, or send us your
            requirement and we will point you in the right direction.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Back to home
            </Link>
            <Link
              href="/#enquiry-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Get a free quote
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-slate-400">
          Weblign — website design and development for Indian businesses.
        </p>
      </footer>
    </div>
  );
}

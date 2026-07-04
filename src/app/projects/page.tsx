import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Projects — Innovation Club",
  description:
    "Real projects built by Innovation Club students at Makindye Secondary School — from sustainability engineering to software shipped at trimester demo days.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            Innovation Club — Makindye Secondary School
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-6xl leading-[1.05] mt-4">
            Built by students.
            <br />
            <span className="text-brand">Shipped for real.</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-xl text-lg font-light">
            Every project here is real work by secondary school students — engineered, documented,
            and presented in public. Nothing on this page is a mock-up.
          </p>
        </section>

        {/* Flagship */}
        <section className="max-w-6xl mx-auto px-6 pt-16">
          <Link
            href="/makss/zayed/soilSkeleton"
            className="block border border-line bg-surface rounded-2xl p-8 sm:p-12 hover:border-ink-faint transition-colors"
          >
            <p className="font-[family-name:var(--font-mono)] text-xs text-gold tracking-wider">
              ★ Flagship · Zayed Sustainability Prize 2027 Submission
            </p>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
              The Vascular
              <br />
              <span className="text-brand">Earth Initiative.</span>
            </h2>
            <p className="text-ink-faint mt-4 max-w-2xl leading-relaxed">
              A smart sub-surface irrigation and atmospheric conditioning system — an underground
              hexagonal pipe grid with ESP32-driven moisture sensing, paired with a hygro-electric
              conditioning tower. Targeting 70% water savings and year-round farming for Uganda&apos;s
              food-insecure regions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 border-t border-line pt-6">
              <div><p className="font-[family-name:var(--font-display)] font-bold text-xl">70%</p><p className="text-xs text-ink-faint mt-1">Water saved</p></div>
              <div><p className="font-[family-name:var(--font-display)] font-bold text-xl">24/7</p><p className="text-xs text-ink-faint mt-1">Automated</p></div>
              <div><p className="font-[family-name:var(--font-display)] font-bold text-xl">ESP32</p><p className="text-xs text-ink-faint mt-1">Core intelligence</p></div>
              <div><p className="font-[family-name:var(--font-display)] font-bold text-xl text-gold">✓</p><p className="text-xs text-ink-faint mt-1">School-endorsed</p></div>
            </div>
            <span className="inline-block mt-8 text-brand font-medium">Explore the project →</span>
          </Link>
        </section>

        {/* What ships next — honest, tied to the real programme */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            What Ships Next
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
            Every trimester
            <br />
            <span className="text-brand">ends in public.</span>
          </h2>
          <p className="text-ink-faint mt-4 max-w-2xl">
            Student software projects are presented at live demo days at the end of each trimester —
            on hosted URLs guests can open on their own phones. As each cohort ships, their work
            appears here.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              ["T2", "Live student websites", "Every Web Foundations student deploys a personal site to GitHub Pages — public, permanent, and theirs."],
              ["T3–T4", "Web & desktop applications", "Interactive apps with real databases, then installable desktop software built in Python."],
              ["T5–T6", "Mobile apps & AI projects", "Flutter apps on real devices, and AI-assisted capstone projects presented to parents and guests."],
            ].map(([tag, title, desc]) => (
              <div key={tag} className="border border-line border-dashed rounded-xl p-6">
                <span className="font-[family-name:var(--font-mono)] text-brand text-sm">{tag}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold mt-2">{title}</h3>
                <p className="text-sm text-ink-faint mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 pt-24 text-center">
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl">
            Want your work
            <br />
            <span className="text-brand">on this page?</span>
          </h2>
          <Link
            href="/register"
            className="inline-block mt-8 bg-brand hover:bg-brand-dim transition-colors px-8 py-3.5 rounded-lg font-medium"
          >
            Join the club
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

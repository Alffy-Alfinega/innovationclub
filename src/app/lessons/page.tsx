import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { CURRICULUM } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Lessons — Innovation Club",
  description: "The full six-trimester curriculum, broken down by topic.",
};


export default function LessonsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-4xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            Innovation Club Curriculum
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-4">
            Six trimesters,
            <br />
            <span className="text-brand">topic by topic.</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-xl text-lg font-light">
            The full breakdown of what&apos;s actually taught each trimester — from computer
            fundamentals to a mobile app on students&apos; own phones.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-4">
          {CURRICULUM.map((tri) => (
            <div key={tri.n} className="border border-line bg-surface rounded-xl p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-brand text-sm">{tri.n}</span>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-xl">{tri.title}</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {tri.topics.map((topic) => (
                  <li key={topic} className="text-sm text-ink-faint leading-relaxed flex gap-2.5">
                    <span className="text-brand shrink-0">·</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

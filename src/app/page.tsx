import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MarketingHero from "@/components/marketing/MarketingHero";

const MARQUEE = [
  "Computer Fundamentals", "Web Foundations", "HTML & CSS", "JavaScript",
  "Databases", "Python", "Desktop Apps", "Flutter & Dart", "Mobile Apps",
  "Git & GitHub", "AI Tools", "Live Deployment",
];

const TRIMESTERS = [
  { n: "01", t: "Computer Fundamentals", d: "Hardware in programmer terms, typing discipline, file management as repository practice, and developer infrastructure — email, accounts, real tooling from day one." },
  { n: "02", t: "Web Foundations", d: "HTML and CSS as engineering, not decoration. Every student ships a live site to GitHub Pages — loadable on any phone, not localhost." },
  { n: "03", t: "Interactive Web Apps & Databases", d: "JavaScript, data, and the first real applications. State, storage, and the logic that makes pages do things." },
  { n: "04", t: "Desktop App Development", d: "Python and GUI applications — software that installs and runs, built and demonstrated in front of a live audience." },
  { n: "05", t: "Mobile App Development", d: "Flutter and Dart. Apps on the devices students actually own, built to vocational-grade standards." },
  { n: "06", t: "AI & Business Communication", d: "Working with AI tools professionally, plus documentation, presentation, and the communication skills that turn builders into professionals." },
];

const WHY = [
  { n: "01", t: "Engineering framing from session one", d: "CPU and RAM in programmer terms. A spreadsheet formula as a function with arguments. A cell reference as a variable. Students think like developers before they write their first program." },
  { n: "02", t: "Every trimester ends in public", d: "GUI-based, demonstrable projects presented to parents and guests on live, hosted URLs — never a mock-up, never localhost." },
  { n: "03", t: "Professional practice throughout", d: "Git, documentation, deployment, and presentation are embedded in every trimester — not saved for a final unit." },
  { n: "04", t: "Built by a working agency", d: "Alffy (Alfinega) is a working digital agency in Kampala. The tools, the standards, and the instructors come from live client work." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-14">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            Makindye, Kampala, Uganda · An Alffy (Alfinega) initiative
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-6xl leading-[1.05] mt-4">
            Learn to build
            <br />
            <span className="text-brand">real software.</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-xl text-lg font-light">
            An advanced ICT and software development programme for secondary school students —
            six trimesters from computer fundamentals to mobile apps and AI, taught to
            vocational-grade standards.
          </p>
          <div className="flex gap-3 mt-8">
            <Link href="/register" className="bg-brand hover:bg-brand-dim transition-colors px-6 py-3 rounded-lg font-medium">
              Register now
            </Link>
            <Link href="/#programme" className="border border-line hover:border-ink-faint transition-colors px-6 py-3 rounded-lg font-medium">
              The programme
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 border-t border-line pt-8">
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">6</p><p className="text-xs text-ink-faint mt-1">Trimesters</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">S1–S6</p><p className="text-xs text-ink-faint mt-1">Open to all levels</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">Live</p><p className="text-xs text-ink-faint mt-1">Hosted demo days</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl text-gold">3</p><p className="text-xs text-ink-faint mt-1">Languages mastered</p></div>
          </div>
        </section>

        {/* 3D signature */}
        <section className="max-w-6xl mx-auto px-6">
          <MarketingHero />
        </section>

        {/* Marquee */}
        <div className="border-y border-line mt-14 py-4 overflow-hidden">
          <div className="marquee-track flex gap-6 whitespace-nowrap w-max">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="font-[family-name:var(--font-mono)] text-sm text-ink-faint flex items-center gap-6">
                {item} <span className="text-brand">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Programme */}
        <section id="programme" className="max-w-6xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">02 / The Programme</p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
            Six trimesters.
            <br />
            <span className="text-brand">One clear path.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {TRIMESTERS.map((tri) => (
              <div key={tri.n} className="border border-line bg-surface rounded-xl p-6 hover:border-ink-faint transition-colors">
                <span className="font-[family-name:var(--font-mono)] text-brand text-sm">{tri.n}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold mt-2">{tri.t}</h3>
                <p className="text-sm text-ink-faint mt-2 leading-relaxed">{tri.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">03 / Why This Club</p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
            Built different.
            <br />
            <span className="text-brand">Taught properly.</span>
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {WHY.map((w) => (
              <div key={w.n} className="grid sm:grid-cols-[80px_240px_1fr] gap-3 py-6">
                <span className="font-[family-name:var(--font-mono)] text-ink-faint">{w.n}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold">{w.t}</h3>
                <p className="text-sm text-ink-faint leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fees */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">04 / Fees</p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
            Transparent.
            <br />
            <span className="text-brand">Always.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-3xl">
            <div className="border border-line bg-surface rounded-xl p-6">
              <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint uppercase tracking-wider">Club membership · yearly</p>
              <p className="font-[family-name:var(--font-display)] font-extrabold text-3xl mt-3">UGX 50,000</p>
              <p className="text-sm text-ink-faint mt-3">Club T-shirt and membership card included.</p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6">
              <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint uppercase tracking-wider">Programme lessons · per trimester</p>
              <p className="font-[family-name:var(--font-display)] font-extrabold text-3xl mt-3">UGX 150,000</p>
              <p className="text-sm text-ink-faint mt-3">
                May vary where guest lecturers, third-party services, or cohort size require it — always disclosed in advance.
              </p>
            </div>
          </div>
        </section>

        {/* Project spotlight */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <div className="border border-line bg-surface rounded-2xl p-8 sm:p-12">
            <p className="font-[family-name:var(--font-mono)] text-xs text-gold tracking-wider">★ Zayed Sustainability Prize 2027 Submission</p>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl mt-3">The Vascular Earth Initiative</h2>
            <p className="text-ink-faint mt-4 max-w-2xl leading-relaxed">
              A smart sub-surface irrigation and atmospheric conditioning system designed by
              Makindye Secondary School students — targeting 70% water savings and year-round
              farming for Uganda&apos;s food-insecure regions.
            </p>
            <Link href="/makss/zayed/soilSkeleton" className="inline-block mt-6 text-brand hover:underline font-medium">
              Explore the project →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 pt-24 text-center">
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl">
            Ready to build
            <br />
            <span className="text-brand">something extraordinary?</span>
          </h2>
          <Link href="/register" className="inline-block mt-8 bg-brand hover:bg-brand-dim transition-colors px-8 py-3.5 rounded-lg font-medium">
            Register for the club
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import MarketingHero from "@/components/marketing/MarketingHero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div>
          <span className="text-sm text-blue-400 font-medium">Alffy (Alfinega)</span>
          <h1 className="text-4xl font-bold mt-2">Innovation Club</h1>
          <p className="text-neutral-400 mt-4 max-w-xl">
            Advanced ICT and software development for secondary school students.
            Currently at Makindye Secondary School, Kampala.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-lg text-sm font-medium"
          >
            Register →
          </Link>
        </div>
        <MarketingHero />
      </section>
    </main>
  );
}

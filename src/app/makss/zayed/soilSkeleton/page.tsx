import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

// ⚠️ URL CONTRACT: /makss/zayed/soilSkeleton is the exact URL submitted in
// the official Zayed Sustainability Prize 2027 application (DbqGxxlB).
// This route must NEVER move. Content restored verbatim from git 3f8228a
// after the 2026-07-04 clean-slate wipe.

export const metadata: Metadata = {
  title: "Vascular Earth Initiative — Makindye Secondary School",
  description:
    "A smart sub-surface irrigation and atmospheric conditioning system by Makindye Secondary School students. Zayed Sustainability Prize 2027 submission.",
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">{children}</p>
);

const H2 = ({ line1, line2 }: { line1: string; line2: string }) => (
  <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl mt-3">
    {line1}
    <br />
    <span className="text-brand">{line2}</span>
  </h2>
);

export default function VascularEarthPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>Makindye Secondary School — Kampala, Uganda</Eyebrow>
          <p className="font-[family-name:var(--font-mono)] text-xs text-gold tracking-wider mt-1">
            ★ Zayed Sustainability Prize 2027
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-6xl leading-[1.05] mt-4">
            The Vascular
            <br />
            <span className="text-brand">Earth Initiative.</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-2xl text-lg font-light">
            Northern Uganda and semi-arid regions across Sub-Saharan Africa face chronic food
            insecurity, water scarcity, and accelerating desertification. Conventional irrigation
            loses up to 70% of water to surface evaporation — and still depends on seasons.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 border-t border-line pt-8">
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">70%</p><p className="text-xs text-ink-faint mt-1">Water saved vs. surface irrigation</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">24/7</p><p className="text-xs text-ink-faint mt-1">Automated operation</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl text-gold">$150K</p><p className="text-xs text-ink-faint mt-1">Prize budget ceiling</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">ESP32</p><p className="text-xs text-ink-faint mt-1">Core intelligence</p></div>
          </div>
        </section>

        {/* Endorsement banner */}
        <div className="border-y border-line bg-surface mt-14 py-3">
          <p className="max-w-6xl mx-auto px-6 text-center font-[family-name:var(--font-mono)] text-xs text-gold">
            ★ Officially endorsed by Mrs. Naluwoza Christine Kiyimba — Principal, Makindye Secondary School · 5 June 2026 ★
          </p>
        </div>

        {/* Problem */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>01 / The Problem</Eyebrow>
          <H2 line1="Uganda Is Hungry." line2="We Can Fix That." />
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            <div className="border border-line bg-surface rounded-xl p-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold">Food Insecurity</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">
                2,200 Ugandans die of hunger annually. Over 428,000 children and 84,000 women face
                active malnutrition — 24% of children under 5 are malnourished.
              </p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold">Water Waste</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">
                Traditional surface irrigation loses up to 70% of water to evaporation before it
                reaches roots. Crops still fail in dry seasons because supply can&apos;t keep pace.
              </p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6">
              <h3 className="font-[family-name:var(--font-display)] font-bold">Desertification</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">
                Soil structural decay, surface erosion, and climate-driven aridity are turning
                fertile land barren across Karamoja and other regions of Uganda.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>02 / The Solution</Eyebrow>
          <H2 line1="The Soil" line2="Skeleton System." />
          <div className="space-y-4 mt-10">
            <div className="border border-line bg-surface rounded-xl p-6 sm:p-8">
              <p className="font-[family-name:var(--font-mono)] text-xs text-brand">The Soil Skeleton</p>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mt-2">Hexagonal Pipe Grid</h3>
              <p className="text-sm text-ink-faint mt-3 leading-relaxed max-w-3xl">
                An underground hexagonal grid of carbon-coated pipes distributes water and soluble
                phosphate via a Venturi Injector — directly to root level. No surface evaporation.
                No seasonal dependency. Buried against soil weight, resistant to weather and
                physical damage.
              </p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6 sm:p-8">
              <p className="font-[family-name:var(--font-mono)] text-xs text-brand">The Soil Skeleton</p>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mt-2">Adaptive Nerve Probes</h3>
              <p className="text-sm text-ink-faint mt-3 leading-relaxed max-w-3xl">
                Branch-like probe structures extend from the pipe grid, creating permanent aeration
                tunnels and connecting to capacitive soil moisture sensors. The ESP32 core reads
                sensor data and opens valves precisely where the soil needs moisture — zero
                over-watering, zero waste.
              </p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6 sm:p-8">
              <p className="font-[family-name:var(--font-mono)] text-xs text-gold">Atmospheric Heart</p>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mt-2">Hygro-Electric Conditioning Tower</h3>
              <p className="text-sm text-ink-faint mt-3 leading-relaxed max-w-3xl">
                A modified wind turbine generates electricity and simultaneously drives a
                high-pressure pump connected to a water reservoir. The pump releases fine mist
                carried by wind to increase local humidity and boost rainfall formation probability
                — without waiting for clouds. This is atmospheric conditioning that works day and
                night, complementing the underground system above.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>03 / Technology</Eyebrow>
          <H2 line1="Smart by Design." line2="Simple to Scale." />
          <p className="text-ink-faint mt-4 max-w-2xl">
            Every component chosen for availability, durability, and the ability to function in
            low-resource environments across Sub-Saharan Africa.
          </p>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {[
              ["ESP32 Microcontroller", "Central intelligence — reads sensors, controls valves"],
              ["Capacitive Soil Moisture Sensors", "Per-zone water content detection in real time"],
              ["Venturi Injector", "Mixes soluble phosphate into water distribution line"],
              ["Solar Panels + Battery Storage", "Off-grid power — operates without mains electricity"],
              ["Water Filtration + Pumping System", "Adapts to any source — taps, boreholes, or tanks"],
              ["Digital Platforms & Databases", "Remote monitoring, data logging, and system control"],
            ].map(([name, desc]) => (
              <div key={name} className="grid sm:grid-cols-[320px_1fr] gap-2 py-5">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-sm">{name}</h3>
                <p className="text-sm text-ink-faint">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>04 / Impact Roadmap</Eyebrow>
          <H2 line1="From School Grounds" line2="to Sub-Saharan Africa." />
          <p className="text-ink-faint mt-4 max-w-2xl">
            First deployment at Makindye Secondary School — then scaling to Northern Uganda and
            semi-arid regions across Sub-Saharan Africa in collaboration with NGOs, government
            bodies, and farming communities.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              ["Y1", "Pilot & Validation", "Deploy and validate the Soil Skeleton system on school grounds. Measure water savings, crop output, and soil health against baseline. Refine the ESP32 control logic and probe distribution based on real field data."],
              ["Y2", "Community Scale-Up", "Expand to local farming communities in Makindye. Partner with NGOs to fund hardware. Document everything — water consumption, yield improvement, cost per hectare — to build the case for national adoption."],
              ["Y3", "Regional Deployment", "Target Northern Uganda's arid zones where food insecurity is most severe. Collaborate with government agricultural bodies. Publish open-source designs so the system can be replicated anywhere in Sub-Saharan Africa."],
            ].map(([y, t, d]) => (
              <div key={y} className="border border-line bg-surface rounded-xl p-6">
                <span className="font-[family-name:var(--font-mono)] text-brand text-sm">{y}</span>
                <h3 className="font-[family-name:var(--font-display)] font-bold mt-2">{t}</h3>
                <p className="text-sm text-ink-faint mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 border-t border-line pt-8">
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">70%</p><p className="text-xs text-ink-faint mt-1">Less water used</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">365</p><p className="text-xs text-ink-faint mt-1">Days of farming</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl">0</p><p className="text-xs text-ink-faint mt-1">Seasons required</p></div>
            <div><p className="font-[family-name:var(--font-display)] font-bold text-2xl text-gold">↑</p><p className="text-xs text-ink-faint mt-1">Crop output</p></div>
          </div>
        </section>

        {/* School & endorsement */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <Eyebrow>05 / The School</Eyebrow>
          <H2 line1="Makindye Secondary" line2="School." />
          <p className="text-ink-faint mt-4 max-w-2xl">
            1,500 students. Founded 1994. Located in Makindye, Kampala — one of Uganda&apos;s most
            active educational communities. The administration fully endorses this project and has
            authorised its submission to the Zayed Sustainability Prize.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <div className="border border-line bg-surface rounded-xl p-6">
              <span className="text-gold">✓</span>
              <h3 className="font-[family-name:var(--font-display)] font-bold mt-2">Official Endorsement</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">
                This project carries the full written endorsement of{" "}
                <strong className="text-ink">Mrs. Naluwoza Christine Kiyimba</strong>, Principal of
                Makindye Secondary School, stamped and signed on official school letterhead on 5
                June 2026.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint mt-3">
                makindyesecondary@gmail.com · +256 782408181
              </p>
            </div>
            <div className="border border-line bg-surface rounded-xl p-6">
              <span className="text-gold">✓</span>
              <h3 className="font-[family-name:var(--font-display)] font-bold mt-2">Faculty Support</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">
                The project is supervised and supported by{" "}
                <strong className="text-ink">Mr. Saula Isaac</strong>, faculty advisor, who has
                co-signed the application and takes responsibility for guiding the student team
                through implementation and testing.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint mt-3">
                saulahellen@gmail.com · +256 786219758
              </p>
            </div>
          </div>
        </section>

        {/* Video CTA */}
        <section className="max-w-6xl mx-auto px-6 pt-24 text-center">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            Watch the Vascular Earth Initiative
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl mt-3">
            See It
            <br />
            <span className="text-brand">in Action.</span>
          </h2>
          <a
            href="https://youtu.be/MCD9TIK_GwE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-brand hover:bg-brand-dim transition-colors px-8 py-3.5 rounded-lg font-medium"
          >
            Watch the video →
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

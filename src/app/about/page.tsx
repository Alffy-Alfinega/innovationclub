import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const stats = [
  { value: 'Est. 2025', label: 'Founded' },
  { value: 'Kampala', label: 'Based in Uganda' },
  { value: '50+', label: 'Members' },
  { value: '12+', label: 'Programs' },
];

const team = [
  { name: 'Joshua Prosper', role: 'Program Director', initial: 'JP' },
  { name: 'Christiana Mwawule', role: 'Operations Lead', initial: 'CM' },
  { name: 'Sarah Kemigisha', role: 'Mentorship Coordinator', initial: 'SK' },
  { name: 'Daniel Okello', role: 'Technical Lead', initial: 'DO' },
];

export default function AboutPage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <span className="font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-6 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full inline-block w-fit">
          About Us
        </span>
        <h1 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] max-w-[800px]">
          Building Africa&apos;s Next
          <span className="text-[#2C6FED] block mt-2">Generation of Innovators.</span>
        </h1>
        <p className="mt-6 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed">
          Innovation Club is the youth innovation wing of Alffy (Alfinega). We empower young minds aged 15&ndash;25 with the skills, mentorship, and resources they need to turn ideas into impact.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="p-6 border border-[#1C1C34] rounded-2xl text-center bg-[#0A0A1A]">
              <p className="font-syne font-bold text-2xl text-[#2C6FED]">{s.value}</p>
              <p className="font-outfit text-sm text-[#8A8AAA] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <SectionHeading
          tag="Our Story"
          title="Born from a Vision"
          highlight="To Empower Young Africans."
          subtitle="Innovation Club was founded as the youth arm of Alffy (Alfinega) — a full-service digital agency based in Kampala, Uganda. We believe the next great African innovation will come from a young person with an idea and the right support system."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card variant="blue" className="flex flex-col gap-4">
            <h3 className="font-syne font-semibold text-lg text-white">Our Mission</h3>
            <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed">
              To democratise access to innovation skills, tools, and networks for young people across Uganda and Africa — regardless of their background or prior experience.
            </p>
          </Card>
          <Card variant="gold" className="flex flex-col gap-4">
            <h3 className="font-syne font-semibold text-lg text-white">Our Vision</h3>
            <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed">
              A Africa where every young person has the opportunity and support to become an innovator, creator, and leader in the digital economy.
            </p>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <SectionHeading
          tag="Team"
          title="The People Behind"
          highlight="The Movement."
          subtitle="A dedicated team committed to nurturing young talent."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {team.map((member) => (
            <div key={member.name} className="p-7 border border-[#1C1C34] rounded-2xl bg-[#0A0A1A] text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2C6FED] to-[#1A52C4] flex items-center justify-center mx-auto mb-4">
                <span className="font-syne font-bold text-lg text-white">{member.initial}</span>
              </div>
              <h3 className="font-syne font-semibold text-sm text-white">{member.name}</h3>
              <p className="font-outfit text-xs text-[#8A8AAA] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto text-center">
        <h2 className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] tracking-[-0.02em]">
          Be Part of the
          <span className="text-[#2C6FED] block mt-2">Next Generation.</span>
        </h2>
        <p className="mt-4 font-outfit text-base text-[#9A9ABB] max-w-[500px] mx-auto">
          Join a community of young innovators building the future.
        </p>
        <div className="mt-8">
          <Button href="/join">Join the Club →</Button>
        </div>
      </section>
    </div>
  );
}

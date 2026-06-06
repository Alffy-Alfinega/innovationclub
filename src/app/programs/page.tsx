import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const programs = [
  {
    title: 'Innovation Bootcamp',
    desc: 'A 4-week intensive program covering coding, design thinking, and entrepreneurship. Build a real project from scratch and present to a panel of judges.',
    tags: ['Coding', 'Design', 'Business'],
    duration: '4 Weeks',
    format: 'In-Person + Online',
    variant: 'blue' as const,
  },
  {
    title: 'Hackathons & Challenges',
    desc: '48-hour build sprints tackling real-world problems. Work in teams, receive mentorship, and compete for prizes and incubation opportunities.',
    tags: ['Competition', 'Teamwork'],
    duration: '48 Hours',
    format: 'In-Person',
    variant: 'gold' as const,
  },
  {
    title: 'Mentorship Program',
    desc: 'Get paired with industry experts in tech, business, and creative fields. Monthly one-on-one sessions, portfolio reviews, and career guidance.',
    tags: ['Guidance', 'Networking'],
    duration: '3 Months',
    format: 'Online',
    variant: 'blue' as const,
  },
  {
    title: 'Maker Space',
    desc: 'Access our fully-equipped workshop with 3D printers, electronics kits, and prototyping tools. Bring your physical and digital ideas to life.',
    tags: ['Tools', 'Prototyping'],
    duration: 'Ongoing',
    format: 'In-Person',
    variant: 'default' as const,
  },
  {
    title: 'Pitch Competitions',
    desc: 'Present your startup idea to investors and industry leaders. Win seed funding, incubation slots, and valuable connections to accelerate your venture.',
    tags: ['Funding', 'Pitching'],
    duration: 'Quarterly',
    format: 'In-Person + Online',
    variant: 'blue' as const,
  },
  {
    title: 'Entrepreneurship 101',
    desc: 'A foundational course covering business modeling, market research, financial literacy, and go-to-market strategy for aspiring founders.',
    tags: ['Business', 'Strategy'],
    duration: '6 Weeks',
    format: 'Online',
    variant: 'default' as const,
  },
];

export default function ProgramsPage() {
  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <span className="font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-6 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full inline-block w-fit">
          Programs
        </span>
        <h1 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] max-w-[800px]">
          Programs Designed to
          <span className="text-[#2C6FED] block mt-2">Turn Ideas into Impact.</span>
        </h1>
        <p className="mt-6 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed">
          Structured learning paths, hands-on experiences, and real-world challenges — all designed to build the skills that matter.
        </p>
      </section>

      {/* Program Grid */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <Card key={p.title} variant={p.variant} className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={p.variant === 'gold' ? 'gold' : 'blue'}>{p.tags[0]}</Badge>
                <span className="font-mono text-[10px] text-[#666666] tracking-[0.05em] uppercase">{p.duration}</span>
              </div>
              <h3 className="font-syne font-semibold text-lg text-white mb-3">{p.title}</h3>
              <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed mb-6 flex-1">{p.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#1C1C34]">
                <span className="font-outfit text-xs text-[#8A8AAA]">{p.format}</span>
                <span className="font-syne text-xs text-[#2C6FED]">Learn more →</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

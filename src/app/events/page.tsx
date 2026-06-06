import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const events = [
  {
    title: 'Youth Innovation Summit 2026',
    desc: 'A one-day summit bringing together young innovators, industry leaders, and investors for talks, workshops, and networking.',
    date: 'August 15, 2026',
    location: 'Kampala, Uganda',
    tag: 'Summit',
    tagVariant: 'blue' as const,
  },
  {
    title: 'Code Africa Hackathon',
    desc: 'A 48-hour build sprint focused on building solutions for African challenges. Open to all members.',
    date: 'September 5-7, 2026',
    location: 'Innovation Club HQ',
    tag: 'Hackathon',
    tagVariant: 'gold' as const,
  },
  {
    title: 'Design Thinking Workshop',
    desc: 'Learn the fundamentals of design thinking and human-centered problem solving in this hands-on workshop.',
    date: 'October 12, 2026',
    location: 'Online',
    tag: 'Workshop',
    tagVariant: 'blue' as const,
  },
  {
    title: 'Startup Pitch Night',
    desc: 'Showcase your startup idea to a panel of investors and win seed funding. Open to all members with a validated concept.',
    date: 'November 20, 2026',
    location: 'Kampala, Uganda',
    tag: 'Competition',
    tagVariant: 'gold' as const,
  },
];

export default function EventsPage() {
  return (
    <div className="pt-[68px]">
      <section className="min-h-[40vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <span className="font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-6 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full inline-block w-fit">
          Events
        </span>
        <h1 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] max-w-[800px]">
          Upcoming
          <span className="text-[#2C6FED] block mt-2">Events & Activities.</span>
        </h1>
        <p className="mt-6 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed">
          From hackathons to summits — there&apos;s always something happening at Innovation Club.
        </p>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        {events.length > 0 ? (
          <div className="flex flex-col gap-6">
            {events.map((event) => (
              <Card key={event.title} className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={event.tagVariant}>{event.tag}</Badge>
                    <span className="font-mono text-[10px] text-[#666666] tracking-[0.05em] uppercase">{event.date}</span>
                  </div>
                  <h3 className="font-syne font-semibold text-lg text-white mb-2">{event.title}</h3>
                  <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed">{event.desc}</p>
                  <p className="font-outfit text-xs text-[#8A8AAA] mt-3">📍 {event.location}</p>
                </div>
                <div className="shrink-0">
                  <Button href="/join" variant="secondary" className="text-xs px-6 py-3">
                    Register →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-syne font-semibold text-2xl text-white mb-2">No Upcoming Events</p>
            <p className="font-outfit text-sm text-[#9A9ABB]">Check back soon for new events and activities.</p>
          </div>
        )}
      </section>
    </div>
  );
}

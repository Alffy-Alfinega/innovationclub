const testimonials = [
  {
    quote: 'The Innovation Club gave me the skills and confidence to build my first app. The mentorship program is incredible.',
    name: 'Sarah K.',
    role: 'Mobile App Developer',
  },
  {
    quote: 'Through the hackathon, I found co-founders for my startup. We went on to win the pitch competition!',
    name: 'James M.',
    role: 'Founder, GreenTech Solutions',
  },
  {
    quote: 'The mentorship program connected me with industry experts who guided my entire career path. Life-changing.',
    name: 'Amina N.',
    role: 'UI/UX Designer',
  },
  {
    quote: 'I joined with zero coding experience. Six months later, I built my own website from scratch.',
    name: 'Daniel O.',
    role: 'Web Developer',
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-6" style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="shrink-0 w-[340px] md:w-[400px] p-7 border border-[#1C1C34] rounded-2xl bg-[#0A0A1A] flex flex-col justify-between"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, s) => (
                <span key={s} className="text-[#D4A843] text-sm">★</span>
              ))}
            </div>
            <p className="font-outfit text-sm text-[#CCCCEE] leading-relaxed mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p className="font-syne font-semibold text-sm text-white">{t.name}</p>
              <p className="font-outfit text-xs text-[#8A8AAA]">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

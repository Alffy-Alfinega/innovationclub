export default function StatsMarquee() {
  const stats = [
    { value: '50+', label: 'Young Innovators' },
    { value: '12+', label: 'Programs' },
    { value: '15-25', label: 'Age Range' },
    { value: 'Free', label: 'To Join' },
    { value: '5+', label: 'Expert Mentors' },
    { value: '24/7', label: 'Community Access' },
  ];

  return (
    <div className="relative overflow-hidden py-8 border-y border-[#1C1C34]">
      <div className="flex" style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}>
        {[...stats, ...stats].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-10 shrink-0"
          >
            <span className="font-syne font-bold text-2xl text-[#2C6FED]">{stat.value}</span>
            <span className="font-outfit text-sm text-[#8A8AAA] whitespace-nowrap">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const benefits = [
  { title: 'Free Membership', desc: 'All programs and events are completely free for members aged 15–25.' },
  { title: 'Expert Mentorship', desc: 'Get paired with industry professionals who guide your learning journey.' },
  { title: 'Hands-On Projects', desc: 'Build real-world projects that go into your portfolio.' },
  { title: 'Community Access', desc: 'Join a vibrant community of like-minded young innovators.' },
  { title: 'Tools & Resources', desc: 'Access to our maker space, software tools, and learning materials.' },
  { title: 'Opportunities', desc: 'Win prizes, earn internships, and connect with potential employers.' },
];

export default function JoinPage() {
  return (
    <div className="pt-[68px]">
      <section className="min-h-[50vh] flex flex-col justify-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <span className="font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-6 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full inline-block w-fit">
          Join
        </span>
        <h1 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] max-w-[800px]">
          Start Your Innovation
          <span className="text-[#2C6FED] block mt-2">Journey Today.</span>
        </h1>
        <p className="mt-6 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed">
          Free to join. Open to young innovators aged 15&ndash;25 in Uganda and across Africa.
        </p>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <SectionHeading
          tag="Benefits"
          title="Why Join?"
          highlight="Everything You Need."
          subtitle="Free access to programs, mentorship, tools, and a community of innovators."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {benefits.map((b) => (
            <Card key={b.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2C6FED]/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#2C6FED]" />
              </div>
              <h3 className="font-syne font-semibold text-sm text-white">{b.title}</h3>
              <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed">{b.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[800px] mx-auto">
        <SectionHeading
          tag="Apply"
          title="Ready to Join?"
          highlight="Fill in the Form."
          subtitle="We&apos;ll get back to you within 24 hours with your next steps."
        />
        <div className="mt-12">
          <Card className="p-8 md:p-12">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-outfit text-sm text-[#9A9ABB]">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-full bg-transparent border border-[#1C1C34] text-white font-outfit text-sm placeholder-[#666666] focus:outline-none focus:border-[#2C6FED] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-outfit text-sm text-[#9A9ABB]">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-full bg-transparent border border-[#1C1C34] text-white font-outfit text-sm placeholder-[#666666] focus:outline-none focus:border-[#2C6FED] transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="age" className="font-outfit text-sm text-[#9A9ABB]">Age *</label>
                  <input
                    id="age"
                    type="number"
                    required
                    min="15"
                    max="25"
                    placeholder="15-25"
                    className="w-full px-4 py-3 rounded-full bg-transparent border border-[#1C1C34] text-white font-outfit text-sm placeholder-[#666666] focus:outline-none focus:border-[#2C6FED] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="font-outfit text-sm text-[#9A9ABB]">Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, Country"
                    className="w-full px-4 py-3 rounded-full bg-transparent border border-[#1C1C34] text-white font-outfit text-sm placeholder-[#666666] focus:outline-none focus:border-[#2C6FED] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="font-outfit text-sm text-[#9A9ABB]">What interests you? *</label>
                <select
                  id="interest"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[#04040C] border border-[#1C1C34] text-white font-outfit text-sm focus:outline-none focus:border-[#2C6FED] transition-colors"
                >
                  <option value="">Select an area</option>
                  <option value="coding">Coding & Software Development</option>
                  <option value="design">Design & Creative Arts</option>
                  <option value="business">Business & Entrepreneurship</option>
                  <option value="maker">Maker & Hardware</option>
                  <option value="multiple">Multiple / Not Sure</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-outfit text-sm text-[#9A9ABB]">Tell us about yourself</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="What motivates you? What do you hope to gain from the Innovation Club?"
                  className="w-full px-4 py-3 rounded-2xl bg-transparent border border-[#1C1C34] text-white font-outfit text-sm placeholder-[#666666] focus:outline-none focus:border-[#2C6FED] transition-colors resize-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-10 py-4 font-syne font-semibold text-sm text-white rounded-full bg-gradient-to-r from-[#2C6FED] to-[#1A52C4] hover:opacity-90 transition-opacity"
                >
                  Submit Application →
                </button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}

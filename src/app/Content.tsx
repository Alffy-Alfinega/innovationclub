'use client';

import { useEffect, useRef } from 'react';
import { Vector3, Color3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import { useScene } from 'reactylon';
import Hero3D from '@/components/home/Hero3D';
import StatsMarquee from '@/components/home/StatsMarquee';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const programs = [
  {
    number: '01',
    title: 'Innovation Bootcamp',
    description: 'Intensive hands-on workshops in coding, design, and entrepreneurship. Build real projects over 4 weeks.',
    tags: ['Coding', 'Design', 'Business'],
    variant: 'blue' as const,
  },
  {
    number: '02',
    title: 'Hackathons & Challenges',
    description: '48-hour build sprints tackling real-world problems. Win prizes, gain recognition, and launch your idea.',
    tags: ['Competition', 'Teamwork', 'Prizes'],
    variant: 'gold' as const,
  },
  {
    number: '03',
    title: 'Mentorship Program',
    description: 'One-on-one guidance from industry experts across tech, business, and creative fields.',
    tags: ['Guidance', 'Networking', 'Growth'],
    variant: 'blue' as const,
  },
  {
    number: '04',
    title: 'Maker Space',
    description: 'Access tools, equipment, and workspace to bring your physical and digital creations to life.',
    tags: ['Tools', 'Workspace', 'Prototyping'],
    variant: 'default' as const,
  },
];

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free membership in under 2 minutes.' },
  { step: '02', title: 'Choose Your Track', desc: 'Pick from coding, design, business, or maker tracks.' },
  { step: '03', title: 'Build & Learn', desc: 'Attend workshops, join hackathons, work on projects.' },
  { step: '04', title: 'Showcase & Connect', desc: 'Present your work, earn recognition, and grow your network.' },
];

export default function Content() {
  const scene = useScene();

  useEffect(() => {
    const knot = scene.getMeshByName('knot');
    if (knot) {
      const knotMesh = knot as Mesh;
      scene.registerBeforeRender(() => {
        knotMesh.rotation.x += 0.005;
        knotMesh.rotation.y += 0.01;
      });
    }
  }, [scene]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10">
      {/* ── Hero ── */}
      <Hero3D />
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative">
        <div
          className="reveal opacity-0 translate-y-5 transition-all duration-700"
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="inline-block font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-6 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full">
            Innovation Club by Alffy
          </span>
        </div>

        <h1
          className="reveal opacity-0 translate-y-5 transition-all duration-700 font-syne font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.03em] max-w-[900px]"
          style={{ transitionDelay: '0.2s' }}
        >
          Where Young Minds
          <span className="text-[#2C6FED] block mt-2">Build the Future</span>
        </h1>

        <p
          className="reveal opacity-0 translate-y-5 transition-all duration-700 mt-6 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed"
          style={{ transitionDelay: '0.38s' }}
        >
          A youth innovation hub empowering the next generation of creators, builders, and problem-solvers in Uganda and across Africa.
        </p>

        <div
          className="reveal opacity-0 translate-y-5 transition-all duration-700 mt-10 flex flex-col sm:flex-row gap-4"
          style={{ transitionDelay: '0.54s' }}
        >
          <Button href="/join">Join the Club →</Button>
          <Button href="/programs" variant="secondary">Explore Programs</Button>
        </div>

        <div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          style={{ animation: 'fadeIn 1.4s 1s both' }}
        >
          <span className="font-outfit text-[11px] text-[#666666] tracking-[0.12em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#2C6FED] to-transparent" style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsMarquee />

      {/* ── Programs ── */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
          <SectionHeading
            tag="Programs"
            title="What We Offer"
            highlight="For Every Innovator."
            subtitle="Structured programs designed to take you from idea to impact — regardless of your starting point."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <div
              key={p.title}
              className="reveal opacity-0 translate-y-5 transition-all duration-700"
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <Card variant={p.variant} className="group h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-syne font-bold text-3xl text-[#2C6FED] opacity-20">{p.number}</span>
                  <Badge variant={p.variant === 'gold' ? 'gold' : 'blue'}>{p.tags[0]}</Badge>
                </div>
                <h3 className="font-syne font-semibold text-xl text-white mb-3">{p.title}</h3>
                <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[#666666] tracking-[0.05em] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
          <SectionHeading
            tag="How It Works"
            title="Your Journey"
            highlight="In 4 Simple Steps."
            subtitle="From signing up to showcasing your work — we guide you every step of the way."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="reveal opacity-0 translate-y-5 transition-all duration-700"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="p-7 border border-[#1C1C34] rounded-2xl bg-[#0A0A1A] h-full">
                <span className="font-syne font-bold text-4xl text-[#2C6FED] opacity-10 block mb-6">{s.step}</span>
                <h3 className="font-syne font-semibold text-lg text-white mb-2">{s.title}</h3>
                <p className="font-outfit text-sm text-[#9A9ABB] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto mb-12 md:mb-16">
          <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
            <SectionHeading
              tag="Testimonials"
              title="What Our Members"
              highlight="Are Saying."
              subtitle="Real stories from young innovators who have been through our programs."
            />
          </div>
        </div>
        <TestimonialCarousel />
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto text-center">
        <div className="reveal opacity-0 translate-y-5 transition-all duration-700">
          <SectionHeading
            title="Ready to Innovate?"
            highlight="Join the Club Today."
            subtitle="Free membership. Real skills. Lifelong connections."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button href="/join">Join Free →</Button>
            <Button href="/about" variant="secondary">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

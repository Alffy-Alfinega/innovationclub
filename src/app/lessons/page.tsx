import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Lessons — Innovation Club",
  description: "The full six-trimester curriculum, broken down by topic.",
};

const CURRICULUM = [
  {
    n: "01",
    title: "Computer Fundamentals & Web Foundations",
    topics: [
      "Hardware and operating systems in programmer terms — CPU, RAM, and storage explained through how code actually runs",
      "File systems and paths as repository discipline, not just folders",
      "Detailed office automation: spreadsheets as programming (cell references as variables, formulas as functions), the IF() function as your first conditional, and Word as documentation and spec-writing",
      "PowerPoint presentation skills — presenting technical work clearly, a foundation used every trimester after this one",
      "HTML structure and semantic markup",
      "CSS: box model, layout, and responsive design",
      "Git basics and deploying a live site to GitHub Pages",
      "Real-life project: a live school or personal website, deployed and loadable on any phone",
    ],
  },
  {
    n: "02",
    title: "Web App Development & Databases",
    topics: [
      "JavaScript fundamentals: variables, functions, control flow",
      "DOM manipulation, forms, and interactivity",
      "Database basics and structure",
      "Connecting a web app to a real, persistent database",
      "Software engineering principles and Git in a team context",
      "Real-life project: a school event registration system or a local business web app",
    ],
  },
  {
    n: "03",
    title: "Desktop App Development & Python",
    topics: [
      "Introduction to Python",
      "Python logic: variables, loops, and functions",
      "Building graphical interfaces with Tkinter",
      "Reading and writing files and data from an application",
      "Debugging, testing, and documenting real software — not just making it run once",
      "Real-life project: a point-of-sale screen, fees calculator, or inventory tracker",
    ],
  },
  {
    n: "04",
    title: "Mobile App Development & Flutter",
    topics: [
      "Introduction to Dart",
      "Flutter widgets and layouts",
      "Multi-screen apps and navigation",
      "Connecting a mobile app to real data",
      "Deployment and testing on real devices",
      "Real-life project: a 3–4 screen mobile app for a real local need, installed on students' own phones",
    ],
  },
  {
    n: "05",
    title: "Computing Fundamentals to Advanced",
    topics: [
      "Operating system administration",
      "Computer hardware and maintenance",
      "Introduction to Linux",
      "Networking fundamentals",
      "System security and troubleshooting",
      "Real-life project: a live demo — assembling, configuring, and networking machines, presented as \"we built this\"",
    ],
  },
  {
    n: "06",
    title: "AI & Business Communication",
    topics: [
      "AI tools and APIs in applications",
      "Prompt engineering and AI integration",
      "Entrepreneurship fundamentals",
      "Business communication and professional writing",
      "Pitching and presentation skills",
      "Capstone: an AI-powered web app plus a startup-style pitch, presented live to parents and guests at demo day",
    ],
  },
];

export default function LessonsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-4xl mx-auto px-6 pt-20">
          <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint tracking-wider">
            Innovation Club Curriculum
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-4">
            Six trimesters,
            <br />
            <span className="text-brand">topic by topic.</span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-xl text-lg font-light">
            The full breakdown of what&apos;s actually taught each trimester — from computer
            fundamentals to a mobile app on students&apos; own phones.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-4">
          {CURRICULUM.map((tri) => (
            <div key={tri.n} className="border border-line bg-surface rounded-xl p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-brand text-sm">{tri.n}</span>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-xl">{tri.title}</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {tri.topics.map((topic) => (
                  <li key={topic} className="text-sm text-ink-faint leading-relaxed flex gap-2.5">
                    <span className="text-brand shrink-0">·</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

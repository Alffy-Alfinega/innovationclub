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
    title: "Computer Fundamentals",
    topics: [
      "Hardware in programmer terms — CPU, RAM, and storage explained through how code actually runs",
      "File systems and paths as repository discipline, not just folders",
      "Typing accuracy and speed as a foundation skill",
      "Spreadsheets as programming: cell references as variables, formulas as functions with arguments",
      "The IF() function as your first conditional",
      "Word processing as documentation and spec-writing",
      "Email and account management as developer infrastructure",
      "VS Code and browser dev tools — professional tooling from day one",
    ],
  },
  {
    n: "02",
    title: "Web Foundations",
    topics: [
      "HTML structure and semantic markup",
      "CSS: box model, layout, and responsive design",
      "Typography and color as design decisions, not defaults",
      "Git basics: commits, branches, and history",
      "Deploying a live site to GitHub Pages",
      "Trimester project: a personal website, live on a real URL",
    ],
  },
  {
    n: "03",
    title: "Interactive Web Apps & Databases",
    topics: [
      "JavaScript fundamentals: variables, functions, control flow",
      "DOM manipulation and event handling",
      "Working with forms and user input",
      "Introduction to databases and structured data",
      "Connecting a front end to real, persistent data",
      "Trimester project: a working interactive web app",
    ],
  },
  {
    n: "04",
    title: "Desktop App Development",
    topics: [
      "Python fundamentals: syntax, data structures, functions",
      "Building graphical interfaces",
      "Reading and writing files from an application",
      "Packaging and running a real installable program",
      "Trimester project: a desktop app, demoed live",
    ],
  },
  {
    n: "05",
    title: "Mobile App Development",
    topics: [
      "Dart fundamentals and Flutter's widget model",
      "Building layouts and navigation for mobile screens",
      "State management basics",
      "Running and testing on real devices",
      "Trimester project: a mobile app on the students' own phones",
    ],
  },
  {
    n: "06",
    title: "AI & Business Communication",
    topics: [
      "Using AI tools professionally and critically",
      "Technical documentation and writing specs",
      "Presenting technical work to non-technical audiences",
      "Demo day: the capstone project, presented live to parents and guests",
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

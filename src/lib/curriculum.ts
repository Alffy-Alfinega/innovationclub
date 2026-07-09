// Single source of truth for the trimester curriculum — used by BOTH the
// public /lessons page and the in-dashboard /dashboard/lessons page.
// Previously this only lived inside the public page; duplicating it into
// a second copy for the dashboard would create exactly the kind of
// content-drift bug that's been caught and fixed multiple times in this
// project already (two places holding "the same" data that quietly stop
// matching). One array, two renderers.

export type Trimester = {
  n: string;
  title: string;
  topics: string[];
};

export const CURRICULUM: Trimester[] = [
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


export const identity = {
  name: "Aarul Koul",
  role: "Software Development Engineer",
  location: "Pune, India",
  coordinates: "18.52°N / 73.86°E",
  email: "aarulkoul03@gmail.com",
  github: "https://github.com/AarulKoul",
  linkedin: "https://linkedin.com/in/AarulKoul",
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    name: "EDITools",
    tagline: "SaaS — document intelligence",
    description:
      "A SaaS platform that vectorizes PDFs into a searchable store and lets users hold a conversation with their documents. Shipped end-to-end: retrieval pipeline, chat interface, and a working subscription system with free and premium tiers.",
    stack: ["Next.js", "React", "Tailwind CSS", "Prisma"],
    href: "https://github.com/AarulKoul/EDITools",
  },
  {
    name: "Kamao",
    tagline: "Marketplace — founders × investors",
    description:
      "A platform connecting small businesses with prospective investors. Founders make their case with video pitches and prove it with live charts of their numbers — a full pitch-to-capital loop in one product.",
    stack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    href: "https://github.com/AarulKoul/Kamao",
  },
  {
    name: "PolyTalks",
    tagline: "Social — language exchange",
    description:
      "A social language-learning platform that matches people by the languages they're learning. Real-time chat, proficiency assessment, and partner recommendations — built on Firebase, designed for actual conversation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    href: "https://github.com/AarulKoul/PolyTalks",
  },
  {
    name: "Movie Recommender",
    tagline: "ML — content-based filtering",
    description:
      "A content-based recommendation engine running cosine similarity over the metadata of 5,000+ films, with the feature engineering done in Pandas and the results served through a Flask web app.",
    stack: ["Python", "Pandas", "Scikit-learn", "Flask"],
    href: "https://github.com/AarulKoul/movie-recommender",
  },
];

export type RoleRecord = {
  role: string;
  company: string;
  location: string;
  period: string;
  active?: boolean;
  summary: string;
  tags: string[];
};

export const records: RoleRecord[] = [
  {
    role: "Software Development Engineer",
    company: "Borderline Genius — Tech Division of Portway Solutions",
    location: "Pune, IN",
    period: "DEC 2025 — PRESENT",
    active: true,
    summary:
      "Building and maintaining a production SaaS platform in Next.js — architecture through REST API integration — plus an SEO-optimized company site that lifted search visibility and organic traffic.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Software Development Engineer",
    company: "Portway Solutions India Pvt Ltd.",
    location: "Pune, IN",
    period: "JAN 2025 — DEC 2025",
    summary:
      "Shipped the company website in Next.js with measurable gains in load time and accessibility; translated designer wireframes into responsive, interactive components in an Agile team.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    role: "Analytics & Data Science Intern",
    company: "Go Digit Infoworks Services Pvt Ltd.",
    location: "Pune, IN",
    period: "SEP 2024 — DEC 2024",
    summary:
      "Scraped a 2,000-car dataset with Selenium, analyzed 1M+ records for insight, cut video compression time by 94% with an FFmpeg pipeline, and consolidated the team's automation scripts along SOLID lines.",
    tags: ["Python", "Selenium", "Pandas", "FFmpeg"],
  },
  {
    role: "Cyber Developer Intern",
    company: "DeepCytes Cyber Labs (UK)",
    location: "Pune, IN — Remote",
    period: "JUN 2024 — DEC 2024",
    summary:
      "Built back-end functionality for a confidential cyber-intelligence project and ported existing Python systems to Node.js without dropping performance.",
    tags: ["Node.js", "Next.js", "Python"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Tata Technologies Ltd.",
    location: "Pune, IN",
    period: "JUN 2024 — AUG 2024",
    summary:
      "Cleaned a 760,000-row master address dataset, ran sentiment analysis on news and social coverage of the brand, and shipped a responsive site to publish the findings.",
    tags: ["React", "TypeScript", "Python"],
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Dr. Vishwanath Karad MIT World Peace University",
  period: "AUG 2021 — MAY 2025",
  detail: "CGPA 8.94 / 10",
};

export type Stat = {
  value: number;
  kind: "percent" | "compact" | "decimal-percent";
  label: string;
  caption: string;
};

export const stats: Stat[] = [
  {
    value: 94,
    kind: "percent",
    label: "M.01",
    caption: "Video compression time cut with a rebuilt FFmpeg pipeline at Go Digit",
  },
  {
    value: 1000000,
    kind: "compact",
    label: "M.02",
    caption: "Records analyzed to derive insight and build data visualizations",
  },
  {
    value: 760000,
    kind: "compact",
    label: "M.03",
    caption: "Rows of a master address dataset cleaned at Tata Technologies",
  },
  {
    value: 3.5,
    kind: "decimal-percent",
    label: "M.04",
    caption: "Top percentile of 1,800+ teams — Reply Code Challenge 2024",
  },
];

export const capabilities: { heading: string; items: string[] }[] = [
  {
    heading: "Languages",
    items: ["TypeScript / JavaScript", "Python", "Java", "C / C++", "Dart", "HTML / CSS"],
  },
  {
    heading: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Angular", "Spring", "Flutter", "Tailwind CSS"],
  },
  {
    heading: "Tools & Platforms",
    items: ["Git", "Docker", "Google Cloud Platform", "Postman", "Firebase"],
  },
  {
    heading: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
];

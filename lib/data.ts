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
  index: string;
  figure: "editools" | "kamao" | "polytalks" | "recommender";
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  href: string;
  figureCaption: string;
};

export const projects: Project[] = [
  {
    index: "P.01",
    figure: "editools",
    name: "EDITools",
    tagline: "Ask your documents anything.",
    description:
      "A SaaS platform that vectorizes PDFs into a searchable store and lets users hold a conversation with their documents. Shipped end-to-end: retrieval pipeline, chat interface, and a working subscription system with free and premium tiers.",
    stack: ["Next.js", "React", "Tailwind CSS", "Prisma"],
    href: "https://github.com/AarulKoul/EDITools",
    figureCaption: "PDF → embeddings → answers",
  },
  {
    index: "P.02",
    figure: "kamao",
    name: "Kamao",
    tagline: "Where small businesses meet capital.",
    description:
      "A platform connecting small businesses with prospective investors. Founders make their case with video pitches and prove it with live charts of their numbers — a full pitch-to-capital loop in one product.",
    stack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    href: "https://github.com/AarulKoul/Kamao",
    figureCaption: "The pitch-to-capital loop",
  },
  {
    index: "P.03",
    figure: "polytalks",
    name: "PolyTalks",
    tagline: "Fluency through conversation, not flashcards.",
    description:
      "A social language-learning platform that matches people by the languages they're learning. Real-time chat, proficiency assessment, and partner recommendations — built on Firebase, designed for actual conversation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    href: "https://github.com/AarulKoul/PolyTalks",
    figureCaption: "Speaker-to-speaker network",
  },
  {
    index: "P.04",
    figure: "recommender",
    name: "Movie Recommender",
    tagline: "Taste, computed.",
    description:
      "A content-based recommendation engine running cosine similarity over the metadata of 5,000+ films, with the feature engineering done in Pandas and the results served through a Flask web app.",
    stack: ["Python", "Pandas", "Scikit-learn", "Flask"],
    href: "https://github.com/AarulKoul/movie-recommender",
    figureCaption: "Cosine similarity field",
  },
];

export type RoleRecord = {
  index: string;
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
    index: "REC-05",
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
    index: "REC-04",
    role: "Software Development Engineer",
    company: "Portway Solutions India Pvt Ltd.",
    location: "Pune, IN",
    period: "JAN 2025 — DEC 2025",
    summary:
      "Shipped the company website in Next.js with measurable gains in load time and accessibility; translated designer wireframes into responsive, interactive components in an Agile team.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    index: "REC-03",
    role: "Analytics & Data Science Intern",
    company: "Go Digit Infoworks Services Pvt Ltd.",
    location: "Pune, IN",
    period: "SEP 2024 — DEC 2024",
    summary:
      "Scraped a 2,000-car dataset with Selenium, analyzed 1M+ records for insight, cut video compression time by 94% with an FFmpeg pipeline, and consolidated the team's automation scripts along SOLID lines.",
    tags: ["Python", "Selenium", "Pandas", "FFmpeg"],
  },
  {
    index: "REC-02",
    role: "Cyber Developer Intern",
    company: "DeepCytes Cyber Labs (UK)",
    location: "Pune, IN — Remote",
    period: "JUN 2024 — DEC 2024",
    summary:
      "Built back-end functionality for a confidential cyber-intelligence project and ported existing Python systems to Node.js without dropping performance.",
    tags: ["Node.js", "Next.js", "Python"],
  },
  {
    index: "REC-01",
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
    label: "FIG. A",
    caption: "Video compression time cut with a rebuilt FFmpeg pipeline at Go Digit",
  },
  {
    value: 1000000,
    kind: "compact",
    label: "FIG. B",
    caption: "Records analyzed to derive insight and build data visualizations",
  },
  {
    value: 760000,
    kind: "compact",
    label: "FIG. C",
    caption: "Rows of a master address dataset cleaned at Tata Technologies",
  },
  {
    value: 3.5,
    kind: "decimal-percent",
    label: "FIG. D",
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

export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Prisma",
  "Firebase",
  "Docker",
  "GCP",
  "Pandas",
];

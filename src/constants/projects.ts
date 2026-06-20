import { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    id: 1,
    title: "Bookera Library",
    category: "MANAGEMENT / DIGITAL LIBRARY",
    description:
      "A premium high-fidelity digital library ecosystem featuring live catalogs, real-time book availability tracking, digital borrowing records, and interactive reading statistics dashboards.",
    tech: ["Next.js", "Laravel", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Justdhif/bookera-ukk.git",
    accentClass: "bg-lime-green text-black",
    shadowColor: "var(--border-color)",
    urlSlug: "bookera",
    mockupType: "library",
  },
  {
    id: 2,
    title: "Sisfo Sarpras",
    category: "SCHOOL INVENTORY / LENDING SYSTEM",
    description:
      "A comprehensive school facilities and infrastructure lending service. Features an interactive admin dashboard, real-time activity logs, detailed statistics, and streamlined borrowing and returning workflows.",
    tech: ["Laravel", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Justdhif/revisi-sarpras.git",
    accentClass: "bg-pink-accent text-white",
    shadowColor: "var(--border-color)",
    urlSlug: "sisfosarpras",
    mockupType: "lending",
  },
  {
    id: 3,
    title: "Groq AI Assistant",
    category: "ARTIFICIAL INTELLIGENCE / PROMPT TOOL",
    description:
      "An elite generative AI playground that connects users to the lightning-fast Groq LLaMA 3 endpoint, showing real-time text completions, high-speed token updates, and prompt variations.",
    tech: ["React.js", "Groq AI Assistant"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Justdhif/groq-react.git",
    accentClass: "bg-electric text-white",
    shadowColor: "var(--border-color)",
    urlSlug: "groq-ai",
    mockupType: "ai",
  },
  {
    id: 6,
    title: "JustList",
    category: "PRODUCTIVITY / TERMINAL APP",
    description:
      "A retro-inspired terminal todo manager with a full CMD-style interface. Features live task syncing via Supabase, command-based interaction, real-time session tracking, and a pixel-aesthetic dashboard that feels like hacking your tasks into existence.",
    tech: ["React.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Justdhif/cmd-todo-list.git",
    accentClass: "bg-teal-400 text-black",
    shadowColor: "var(--border-color)",
    urlSlug: "justlist",
    mockupType: "justlist",
  },
];

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
    githubUrl: "https://github.com",
    accentClass: "bg-lime-green text-black",
    shadowColor: "var(--border-color)",
    mockupType: "library",
  },
  {
    id: 2,
    title: "EquipShare",
    category: "LENDING ENGINE / LOGISTICS",
    description:
      "A highly interactive equipment lending workspace designed for team assets. Features multi-status booking calendars, drag-and-drop reservations, and detailed check-out histories.",
    tech: ["Laravel", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    accentClass: "bg-pink-accent text-white",
    shadowColor: "var(--border-color)",
    mockupType: "lending",
  },
  {
    id: 3,
    title: "CognitiveAI Studio",
    category: "ARTIFICIAL INTELLIGENCE / PROMPT TOOL",
    description:
      "An elite generative AI playground that connects users to the lightning-fast Groq LLaMA 3 endpoint, showing real-time text completions, high-speed token updates, and prompt variations.",
    tech: ["React.js", "Groq AI Assistant"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    accentClass: "bg-electric text-white",
    shadowColor: "var(--border-color)",
    mockupType: "ai",
  },
  {
    id: 4,
    title: "Apex Wealth",
    category: "FINANCIAL INTELLIGENCE / TRACKER",
    description:
      "A creative neo-brutalist financial companion containing micro-chart monitors for cash flow, multi-currency wallets, automatic recurring transaction tracking, and dynamic visual limits indicators.",
    tech: ["Next.js", "Node.js", "Supabase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    accentClass: "bg-orange-accent text-white",
    shadowColor: "var(--border-color)",
    mockupType: "finance",
  },
  {
    id: 5,
    title: "Retro Strike",
    category: "RETRO ARCADE / INTERACTIVE GAME",
    description:
      "A fast-paced classic 2D space shooter built with HTML5 Canvas, CSS3, and vanilla JavaScript. Features a custom loop engine, fluid particle expansions, synthesized sound effects via Web Audio API, and progressive wave systems.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    accentClass: "bg-pink-accent text-white",
    shadowColor: "var(--border-color)",
    mockupType: "shooter",
  },
];

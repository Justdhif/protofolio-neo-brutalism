export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  accentClass: string;
  shadowColor: string;
  mockupType: "library" | "lending" | "ai" | "finance" | "shooter";
}

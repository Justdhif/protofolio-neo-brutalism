import React from "react";
import {
  Code2,
  Server,
  Palette,
  Database,
  Terminal,
  Sparkles,
} from "lucide-react";
import {
  ReactIcon,
  NextjsIcon,
  FlutterIcon,
  HtmlIcon,
  CssIcon,
  LaravelIcon,
  NodejsIcon,
  PythonIcon,
  NestjsIcon,
  PhpIcon,
  FigmaIcon,
  CanvaIcon,
  MysqlIcon,
  PostgresqlIcon,
  SupabaseIcon,
  PocketbaseIcon,
} from "@/components/brand-icons";
import { SkillCategory } from "@/types/skills";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Architecture",
    description:
      "Building responsive, highly animated, and fast client-side applications.",
    icon: <Code2 size={24} strokeWidth={2.5} />,
    colorClass: "bg-lime-green text-black",
    strokeColorClass: "stroke-lime-green",
    skills: [
      {
        name: "React",
        score: 8,
        icon: (
          <ReactIcon size={20} className="text-[#61dafb] dark:text-[#61dafb]" />
        ),
      },
      {
        name: "Next.js",
        score: 8,
        icon: <NextjsIcon size={20} className="text-black dark:text-white" />,
      },
      {
        name: "Flutter",
        score: 5,
        icon: <FlutterIcon size={20} className="text-[#02568B]" />,
      },
    ],
  },
  {
    title: "Backend Systems",
    description:
      "Scalable server architectures, RESTful APIs, and database engineering.",
    icon: <Server size={24} strokeWidth={2.5} />,
    colorClass: "bg-electric text-white",
    strokeColorClass: "stroke-electric",
    skills: [
      { name: "PHP", score: 8, icon: <PhpIcon size={20} /> },
      {
        name: "Laravel",
        score: 8,
        icon: <LaravelIcon size={20} className="text-[#FF2D20]" />,
      },
      {
        name: "Node.js",
        score: 7,
        icon: <NodejsIcon size={20} className="text-[#339933]" />,
      },
      {
        name: "NestJS",
        score: 6,
        icon: <NestjsIcon size={20} className="text-[#E0234E]" />,
      },
    ],
  },
  {
    title: "UI/UX & Visual Design",
    description:
      "Crafting premium user interfaces, high-fidelity responsive layouts, and seamless brand identities.",
    icon: <Palette size={24} strokeWidth={2.5} />,
    colorClass: "bg-pink-accent text-white",
    strokeColorClass: "stroke-pink-accent",
    skills: [
      { name: "Figma UI/UX", score: 8, icon: <FigmaIcon size={20} /> },
      {
        name: "Typography",
        score: 7,
        icon: <Sparkles size={20} className="text-black dark:text-white" />,
      },
      {
        name: "Prototyping",
        score: 7,
        icon: <Terminal size={20} className="text-black dark:text-white" />,
      },
    ],
  },
  {
    title: "Database Management",
    description:
      "Design, optimization, and administration of relational and modern real-time database systems.",
    icon: <Database size={24} strokeWidth={2.5} />,
    colorClass: "bg-emerald-accent text-white",
    strokeColorClass: "stroke-emerald-accent",
    skills: [
      { name: "MySQL", score: 7, icon: <MysqlIcon size={20} /> },
      { name: "PostgreSQL", score: 7, icon: <PostgresqlIcon size={20} /> },
      { name: "Supabase", score: 7, icon: <SupabaseIcon size={20} /> },
      { name: "PocketBase", score: 6, icon: <PocketbaseIcon size={20} /> },
    ],
  },
];

import React from "react";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import { Milestone } from "@/types/timeline";

export const milestones: Milestone[] = [
  {
    role: "12th Grade Student & Junior Developer",
    company: "Vocational High School (SMK)",
    period: "2025 - PRESENT",
    description: [
      "Currently a 12th-grade student, continuing studies as a Junior Developer towards graduation in 2026.",
      "Expanding skill set into modern frontend frameworks like Next.js for high-performance React applications.",
      "Studying Python to understand computer science fundamentals, algorithms, and scripting.",
      "Continuing mastery of Laravel and PHP for rapid, secure API and backend services.",
    ],
    color: "bg-lime-green text-black",
    icon: <GraduationCap size={18} strokeWidth={2.5} />,
  },
  {
    role: "Fullstack Developer Intern",
    company: "Internship Project (6-Month Magang)",
    period: "2025 (6 MONTHS)",
    description: [
      "Engineered a fullstack production application from scratch during a 6-month intensive internship.",
      "Designed and implemented a high-performance frontend using Next.js, focusing on SEO and responsive design.",
      "Built a secure and scalable backend REST API using PHP and the Laravel framework.",
      "Configured containerized environments using Docker and optimized networking with Cloudflare.",
    ],
    color: "bg-pink-accent text-white",
    icon: <Briefcase size={18} strokeWidth={2.5} />,
  },
  {
    role: "Junior Web Developer (Grade 10 & 11)",
    company: "Vocational High School (SMK)",
    period: "2023 - 2025",
    description: [
      "Grade 10 (2023 - 2024): Built a solid foundation in core web technologies, mastering HTML, CSS, and modern JavaScript.",
      "Grade 11 (2024 - 2025): Transitioned to backend development, studying PHP fundamentals and building dynamic web apps using Laravel.",
      "Collaborated on school coding labs and practical exams to design robust, responsive layout flows.",
    ],
    color: "bg-electric text-white",
    icon: <Code size={18} strokeWidth={2.5} />,
  },
];

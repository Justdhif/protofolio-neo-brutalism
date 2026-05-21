import React from "react";

export interface Skill {
  name: string;
  score: number;
  icon: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  strokeColorClass: string;
  skills: Skill[];
}

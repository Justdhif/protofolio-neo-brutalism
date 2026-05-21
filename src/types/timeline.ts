import React from "react";

export interface Milestone {
  role: string;
  company: string;
  period: string;
  description: string[];
  color: string;
  icon: React.ReactNode;
}

import React from "react";

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Achievement {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

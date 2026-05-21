import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons";
import { HeroSocial } from "@/types/hero";

export const heroSocials: HeroSocial[] = [
  {
    icon: <GithubIcon size={20} />,
    url: "https://github.com",
    label: "GitHub",
  },
  {
    icon: <LinkedinIcon size={20} />,
    url: "https://linkedin.com",
    label: "LinkedIn",
  },
  { icon: <XIcon size={20} />, url: "https://twitter.com", label: "Twitter" },
  { icon: <Mail size={20} />, url: "mailto:nadhif@example.com", label: "Email" },
];

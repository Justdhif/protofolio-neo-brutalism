import React from "react";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/brand-icons";
import { HeroSocial } from "@/types/hero";

export const heroSocials: HeroSocial[] = [
  {
    icon: <GithubIcon size={20} />,
    url: "https://github.com/Justdhif/",
    label: "GitHub",
  },
  {
    icon: <LinkedinIcon size={20} />,
    url: "https://www.linkedin.com/in/nadhif-ararya-wiankosasi-a7a37438a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
  },
  {
    icon: <InstagramIcon size={18} />,
    url: "https://www.instagram.com/justdhif_?igsh=YTQ2OGU2b3M0bHVt",
    label: "Instagram",
  },
  {
    icon: <Mail size={20} />,
    url: "mailto:justdhif418@gmail.com",
    label: "Email",
  },
];

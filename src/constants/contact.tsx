import React from "react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/brand-icons";
import { SocialLink } from "@/types/contact";

export const socialLinks: SocialLink[] = [
  { icon: <GithubIcon size={18} />, url: "https://github.com/Justdhif/" },
  {
    icon: <LinkedinIcon size={18} />,
    url: "https://www.linkedin.com/in/nadhif-ararya-wiankosasi-a7a37438a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    icon: <InstagramIcon size={18} />,
    url: "https://www.instagram.com/justdhif_?igsh=YTQ2OGU2b3M0bHVt",
  },
];

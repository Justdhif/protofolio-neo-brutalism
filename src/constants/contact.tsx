import React from "react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons";
import { SocialLink } from "@/types/contact";

export const socialLinks: SocialLink[] = [
  { icon: <GithubIcon size={18} />, url: "https://github.com" },
  { icon: <LinkedinIcon size={18} />, url: "https://linkedin.com" },
  { icon: <XIcon size={18} />, url: "https://twitter.com" },
];

"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import React from "react";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  iconClassName?: string;
}

const socials = [
  { href: "https://github.com/Brajesh31", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/brajesh-kumar-9b58651a8/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.instagram.com/yourinstagramhandle/", label: "Instagram", Icon: Instagram }, // Replace "yourinstagramhandle" with your actual handle or remove if not used
];

export function SocialLinks({ className = "", iconSize = 20, iconClassName = "" }: SocialLinksProps) {
  return (
      <div className={`flex items-center gap-3 sm:gap-5 ${className}`}>
        {socials.map(({ href, label, Icon }) => (
            <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-2 rounded-md hover:bg-[rgba(255,78,66,0.12)] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4e42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100f]"
            >
              <Icon
                  size={iconSize}
                  className={`text-[#c2b8b2] group-hover:text-[#ff4e42] transition-colors ${iconClassName}`}
              />
            </a>
        ))}
      </div>
  );
}

"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useAnchorClick } from "@/components/animations/SmoothScrollProvider";
import type { Profile } from "@/types/portfolio";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const handleAnchorClick = useAnchorClick(-72);
  const initial = profile.name.charAt(0);

  const onNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    handleAnchorClick(event, href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="#home"
          onClick={onNavClick("#home")}
          className="flex items-center gap-1 text-xl font-bold text-slate-900"
        >
          {initial}
          <span className="text-indigo-600">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavClick(link.href)}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.cvFileUrl}
            download
            className="hidden items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavClick(link.href)}
                className="text-sm font-medium text-slate-600"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={profile.cvFileUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import Reveal from "@/components/animations/Reveal";
import type { Profile } from "@/types/portfolio";

export default function CTA({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal variant="fade-up" y={64}>
        <div className="rounded-3xl bg-indigo-50 px-6 py-12 sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                <Send className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Let&apos;s build something amazing together
                </h2>
                <p className="mt-2 max-w-md text-slate-600">
                  Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href={profile.social.email}
                className="magnetic-btn inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get In Touch
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <a href={profile.social.email} className="inline-flex items-center gap-1 hover:text-indigo-600">
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-600"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

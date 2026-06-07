"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal, { StaggerReveal } from "@/components/animations/Reveal";
import type { Experience, Profile, Skill } from "@/types/portfolio";

export default function AboutSkillsExperience({
  profile,
  skills,
  experience,
}: {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
}) {
  const paragraphs = profile.aboutMeContent.split("\n\n").filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-3">
        <Reveal id="about" variant="clip">
          <p className="text-xs font-semibold tracking-widest text-slate-400">ABOUT ME</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{profile.aboutMeHeader}</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href="#contact"
            className="magnetic-btn mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            More About Me
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal id="skills" delay={0.08}>
          <p className="text-xs font-semibold tracking-widest text-slate-400">SKILLS</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">My Tech Stack</h2>
          <StaggerReveal className="mt-6 space-y-5" stagger={0.08}>
            {skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-sm font-semibold text-slate-900">{skill.category}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </Reveal>

        <Reveal id="experience" delay={0.12}>
          <p className="text-xs font-semibold tracking-widest text-slate-400">EXPERIENCE</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">My Journey</h2>
          <StaggerReveal className="relative mt-6 space-y-8 border-l-2 border-indigo-100 pl-6" stagger={0.1}>
            {experience.map((item) => (
              <div key={item.id} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-white" />
                <p className="text-xs font-semibold text-indigo-600">{item.period}</p>
                <p className="mt-1 font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal, { StaggerReveal } from "@/components/animations/Reveal";
import type { Experience, Profile, Skill } from "@/types/portfolio";

const INITIAL_VISIBLE_COUNT = 3;

function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);

  const hasMore = experience.length > INITIAL_VISIBLE_COUNT;
  const visibleExperience = showAll ? experience : experience.slice(0, INITIAL_VISIBLE_COUNT);

  const toggleItem = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div>
      <div className="relative space-y-1 border-l-2 border-indigo-100 pl-6">
        {visibleExperience.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <div key={item.id} className="relative py-3">
              <span
                className={`absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-white transition-colors ${
                  isOpen ? "bg-indigo-600" : "bg-indigo-200"
                }`}
              />
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="group w-full rounded-lg px-2 py-1 text-left transition hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <p className="text-xs font-semibold text-indigo-600">{item.period}</p>
                <div className="mt-0.5 flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <ChevronDown
                    className={`mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:text-indigo-600 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-2 pb-1 pt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="magnetic-btn mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          {showAll ? "Show less" : `View full journey (${experience.length} roles)`}
          <ArrowRight className={`h-4 w-4 transition-transform ${showAll ? "-rotate-90" : ""}`} />
        </button>
      )}
    </div>
  );
}

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
      <div className="grid gap-12 lg:grid-cols-2">
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
      </div>

      <Reveal id="experience" delay={0.12} className="mt-16 border-t border-slate-100 pt-16 lg:mt-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold tracking-widest text-slate-400">EXPERIENCE</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">My Journey</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Tap a role to read more. {experience.length} positions across fintech, legal tech, AI,
              and community leadership.
            </p>
          </div>

          <ExperienceTimeline experience={experience} />
        </div>
      </Reveal>
    </section>
  );
}

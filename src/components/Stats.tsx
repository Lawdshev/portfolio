"use client";

import { Clock, Code2, Rocket, User } from "lucide-react";
import { StaggerReveal } from "@/components/animations/Reveal";
import type { Stat } from "@/types/portfolio";

const iconMap = {
  rocket: Rocket,
  code: Code2,
  clock: Clock,
  user: User,
};

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <StaggerReveal className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-4 sm:gap-6 sm:p-8">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.label} className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 sm:mb-0">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </StaggerReveal>
    </section>
  );
}

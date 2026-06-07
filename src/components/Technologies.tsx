import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { resolveTechnologyIcon } from "@/lib/technologies";
import type { Technology } from "@/types/portfolio";

function TechnologyItem({ technology }: { technology: Technology }) {
  const icon = resolveTechnologyIcon(technology);

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-100">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
        <Image
          src={icon}
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-slate-700">
        {technology.name}
      </span>
    </div>
  );
}

export default function Technologies({ technologies }: { technologies: Technology[] }) {
  const items = [...technologies, ...technologies];

  return (
    <Reveal className="border-y border-slate-100 bg-slate-50/50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-semibold tracking-widest text-slate-400">
          TECHNOLOGIES I WORK WITH
        </p>
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-6">
            {items.map((technology, index) => (
              <TechnologyItem key={`${technology.id}-${index}`} technology={technology} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

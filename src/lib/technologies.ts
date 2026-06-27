export interface Technology {
  id: string;
  name: string;
  icon: string;
}

const DEFAULT_TECH_ICONS: Record<string, string> = {
  React: "/images/tech/react.svg",
  "Next.js": "/images/tech/nextjs.svg",
  TypeScript: "/images/tech/typescript.svg",
  JavaScript: "/images/tech/javascript.svg",
  "Node.js": "/images/tech/nodejs.svg",
  Express: "/images/tech/express.svg",
  "Tailwind CSS": "/images/tech/tailwindcss.svg",
  PostgreSQL: "/images/tech/postgresql.svg",
  MongoDB: "/images/tech/mongodb.svg",
  Redis: "/images/tech/redis.svg",
  Prisma: "/images/tech/prisma.svg",
  GraphQL: "/images/tech/graphql.svg",
  Convex: "/images/tech/convex.svg",
  "Socket.io": "/images/tech/socketio.svg",
  OpenAI: "/images/tech/openai.svg",
  Docker: "/images/tech/docker.svg",
  Git: "/images/tech/git.svg",
  Vercel: "/images/tech/vercel.svg",
  Figma: "/images/tech/figma.svg",
};

export function defaultTechnologyIcon(name: string): string {
  return DEFAULT_TECH_ICONS[name] ?? "/images/tech/default.svg";
}

export function resolveTechnologyIcon(technology: Technology): string {
  return technology.icon || defaultTechnologyIcon(technology.name);
}

export function normalizeTechnologies(technologies: unknown): Technology[] {
  if (!Array.isArray(technologies)) return [];

  return technologies.map((item, index) => {
    if (typeof item === "string") {
      return {
        id: String(index + 1),
        name: item,
        icon: defaultTechnologyIcon(item),
      };
    }

    const tech = item as Partial<Technology>;
    const name = tech.name ?? "Technology";
    return {
      id: tech.id ?? String(index + 1),
      name,
      icon: tech.icon || defaultTechnologyIcon(name),
    };
  });
}

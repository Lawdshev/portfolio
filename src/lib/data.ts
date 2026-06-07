import { promises as fs } from "fs";
import path from "path";
import { normalizeTechnologies } from "@/lib/technologies";
import type { PortfolioData } from "@/types/portfolio";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw) as PortfolioData;
  return {
    ...data,
    technologies: normalizeTechnologies(data.technologies),
  };
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import type { Skill } from "@/types/portfolio";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const skill = (await request.json()) as Omit<Skill, "id">;
    const data = await getPortfolioData();
    const newSkill: Skill = {
      ...skill,
      id: crypto.randomUUID(),
    };
    data.skills.push(newSkill);
    await savePortfolioData(data);
    return NextResponse.json(newSkill);
  } catch {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const skill = (await request.json()) as Skill;
    const data = await getPortfolioData();
    const index = data.skills.findIndex((s) => s.id === skill.id);
    if (index === -1) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    data.skills[index] = skill;
    await savePortfolioData(data);
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const data = await getPortfolioData();
    data.skills = data.skills.filter((s) => s.id !== id);
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

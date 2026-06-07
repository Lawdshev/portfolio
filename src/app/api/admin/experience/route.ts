import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import type { Experience } from "@/types/portfolio";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const experience = (await request.json()) as Omit<Experience, "id">;
    const data = await getPortfolioData();
    const newExperience: Experience = {
      ...experience,
      id: crypto.randomUUID(),
    };
    data.experience.push(newExperience);
    await savePortfolioData(data);
    return NextResponse.json(newExperience);
  } catch {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const experience = (await request.json()) as Experience;
    const data = await getPortfolioData();
    const index = data.experience.findIndex((e) => e.id === experience.id);
    if (index === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    data.experience[index] = experience;
    await savePortfolioData(data);
    return NextResponse.json(experience);
  } catch {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
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
    data.experience = data.experience.filter((e) => e.id !== id);
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import type { Technology } from "@/types/portfolio";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const technology = (await request.json()) as Omit<Technology, "id">;
    const data = await getPortfolioData();
    const newTechnology: Technology = {
      ...technology,
      id: crypto.randomUUID(),
    };
    data.technologies.push(newTechnology);
    await savePortfolioData(data);
    return NextResponse.json(newTechnology);
  } catch {
    return NextResponse.json({ error: "Failed to create technology" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const technology = (await request.json()) as Technology;
    const data = await getPortfolioData();
    const index = data.technologies.findIndex((item) => item.id === technology.id);
    if (index === -1) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 });
    }
    data.technologies[index] = technology;
    await savePortfolioData(data);
    return NextResponse.json(technology);
  } catch {
    return NextResponse.json({ error: "Failed to update technology" }, { status: 500 });
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
    data.technologies = data.technologies.filter((item) => item.id !== id);
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete technology" }, { status: 500 });
  }
}

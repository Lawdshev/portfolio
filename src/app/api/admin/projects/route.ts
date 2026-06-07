import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import type { Project } from "@/types/portfolio";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = (await request.json()) as Omit<Project, "id">;
    const data = await getPortfolioData();
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
    };
    data.projects.push(newProject);
    await savePortfolioData(data);
    return NextResponse.json(newProject);
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = (await request.json()) as Project;
    const data = await getPortfolioData();
    const index = data.projects.findIndex((p) => p.id === project.id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    data.projects[index] = project;
    await savePortfolioData(data);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    data.projects = data.projects.filter((p) => p.id !== id);
    await savePortfolioData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

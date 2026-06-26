import type { Profile } from "@/types/portfolio";

export function defaultSiteTitle(profile: Pick<Profile, "name" | "position">): string {
  return `${profile.name} | ${profile.position}`;
}

export function defaultSiteDescription(profile: Pick<Profile, "name" | "position">): string {
  return `Portfolio of ${profile.name} - ${profile.position}`;
}

export function normalizeProfile(profile: Profile): Profile {
  return {
    ...profile,
    siteTitle: profile.siteTitle || defaultSiteTitle(profile),
    siteDescription: profile.siteDescription || defaultSiteDescription(profile),
  };
}

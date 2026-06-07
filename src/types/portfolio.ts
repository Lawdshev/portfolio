export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export type HeroBadgePosition =
  | "top-left"
  | "top-right"
  | "middle-left"
  | "middle-right"
  | "bottom-left"
  | "bottom-right";

export interface HeroBadge {
  text: string;
  icon?: "rocket" | "code" | "none";
  position?: HeroBadgePosition;
}

export interface Stat {
  value: string;
  label: string;
  icon: "rocket" | "code" | "clock" | "user";
}

export interface Profile {
  name: string;
  position: string;
  positionHighlight: string;
  headline: string;
  greeting: string;
  aboutMeHeader: string;
  aboutMeContent: string;
  cvFileUrl: string;
  profileImage: string;
  social: SocialLinks;
  heroBadges: HeroBadge[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export interface PortfolioData {
  profile: Profile;
  technologies: Technology[];
  stats: Stat[];
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
}

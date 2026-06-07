import { cookies } from "next/headers";

export const ADMIN_COOKIE = "portfolio_admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_SECRET || "portfolio-admin-session-token";
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === getSessionToken();
}

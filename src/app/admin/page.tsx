import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (authed) {
    redirect("/admin/dashboard");
  }
  return <AdminLogin />;
}

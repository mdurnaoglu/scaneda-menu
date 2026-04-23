import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminScopeByUsername } from "@/data/repositories";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-session";

export async function getAdminScopeOrRedirect() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  const adminScope = await getAdminScopeByUsername(session.username);

  if (!adminScope) {
    redirect("/admin/login");
  }

  return adminScope;
}

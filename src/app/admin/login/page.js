import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/admin/login-form";
import { AppShell } from "@/components/layout/app-shell";
import { Section } from "@/components/primitives/section";
import { Surface } from "@/components/primitives/surface";
import { Stack } from "@/components/primitives/stack";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-session";

export default async function AdminLoginPage({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;
  const params = await searchParams;
  const nextPath = typeof params.next === "string" ? params.next : "/admin";

  if (session) {
    redirect(nextPath === "/login" ? "/admin" : nextPath);
  }

  return (
    <AppShell>
      <Section width="public">
        <div className="auth-layout">
          <Surface padded className="auth-panel">
            <Stack gap="lg">
              <Stack gap="sm">
                <p className="eyebrow">Admin Access</p>
                <h1 className="section-title">Sign in to manage your restaurant.</h1>
                <p className="body-text">
                  Minimal credentials only. No signup, no recovery flow, no extra role complexity.
                </p>
              </Stack>

              <LoginForm nextPath={nextPath} />
            </Stack>
          </Surface>
        </div>
      </Section>
    </AppShell>
  );
}

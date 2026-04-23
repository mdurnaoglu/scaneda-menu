import { AdminNavigation } from "@/components/admin/admin-navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { AdminShell } from "@/components/layout/admin-shell";
import { Stack } from "@/components/primitives/stack";
import { getAdminScopeOrRedirect } from "@/lib/admin-auth";

export default async function AdminProtectedLayout({ children }) {
  const adminScope = await getAdminScopeOrRedirect();

  return (
    <AdminShell>
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <Stack gap="lg">
            <div className="admin-sidebar-brand">
              <div className="admin-sidebar-mark" aria-hidden="true">
                <span className="admin-sidebar-mark-dot" />
              </div>
              <div className="admin-sidebar-brand-copy">
                <p className="caption-text">Admin Panel</p>
                <h1 className="admin-brand">{adminScope.restaurant.name}</h1>
              </div>
            </div>

            <p className="admin-sidebar-user">Authenticated as {adminScope.user.username}</p>

            <AdminNavigation />

            <div className="admin-sidebar-footer">
              <LogoutButton />
            </div>
          </Stack>
        </aside>

        <section className="admin-content">{children}</section>
      </div>
    </AdminShell>
  );
}

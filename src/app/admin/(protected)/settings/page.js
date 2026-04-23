import { AdminSectionShell } from "@/components/admin/admin-section-shell";
import { SettingsManager } from "@/components/admin/settings-manager";
import {
  RESTAURANT_COVER_LIBRARY,
  RESTAURANT_LOGO_LIBRARY
} from "@/data/restaurant-images";
import { getAdminScopeOrRedirect } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  const adminScope = await getAdminScopeOrRedirect();

  return (
    <AdminSectionShell
      eyebrow="Settings"
      title="Restaurant identity and public presence."
      description="Manage the primary details that shape how your menu appears in the public experience."
    >
      <SettingsManager
        restaurant={adminScope.restaurant}
        logoOptions={RESTAURANT_LOGO_LIBRARY}
        coverOptions={RESTAURANT_COVER_LIBRARY}
      />
    </AdminSectionShell>
  );
}

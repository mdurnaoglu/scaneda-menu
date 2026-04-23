import { AdminOverviewPanel } from "@/components/admin/admin-overview-panel";
import { AdminSectionShell } from "@/components/admin/admin-section-shell";
import { getAdminScopeOrRedirect } from "@/lib/admin-auth";
import { buildPublicUrl } from "@/lib/site-config";

export default async function AdminOverviewPage() {
  const adminScope = await getAdminScopeOrRedirect();
  const publicEntryUrl = buildPublicUrl(adminScope.restaurant.slug, "lang");

  return (
    <AdminSectionShell
      eyebrow="Overview"
      title="Calm operational view for your restaurant."
      description="A focused entry point for restaurant identity, public routing, and core menu structure."
    >
      <AdminOverviewPanel
        restaurantName={adminScope.restaurant.name}
        publicEntryUrl={publicEntryUrl}
        categoryCount={adminScope.categories.length}
        productCount={adminScope.products.length}
      />
    </AdminSectionShell>
  );
}

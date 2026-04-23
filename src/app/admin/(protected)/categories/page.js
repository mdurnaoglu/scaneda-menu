import { AdminSectionShell } from "@/components/admin/admin-section-shell";
import { CategoryManager } from "@/components/admin/category-manager";
import { CATEGORY_IMAGE_LIBRARY } from "@/data/category-images";
import { getAdminScopeOrRedirect } from "@/lib/admin-auth";

export default async function AdminCategoriesPage() {
  const adminScope = await getAdminScopeOrRedirect();

  return (
    <AdminSectionShell
      eyebrow="Categories"
      title="Category structure for the public menu."
      description="Create, reorder, and refine bilingual category content with a focused editing surface."
    >
      <CategoryManager
        categories={adminScope.categories}
        imageOptions={CATEGORY_IMAGE_LIBRARY}
        restaurantId={adminScope.restaurant.id}
      />
    </AdminSectionShell>
  );
}

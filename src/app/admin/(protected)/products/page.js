import { AdminSectionShell } from "@/components/admin/admin-section-shell";
import { ProductManager } from "@/components/admin/product-manager";
import { PRODUCT_IMAGE_LIBRARY } from "@/data/product-images";
import { getAdminScopeOrRedirect } from "@/lib/admin-auth";

export default async function AdminProductsPage() {
  const adminScope = await getAdminScopeOrRedirect();

  return (
    <AdminSectionShell
      eyebrow="Products"
      title="Product structure and bilingual content shell."
      description="Create, edit, reorder, and assign products while keeping bilingual content easy to manage."
    >
      <ProductManager
        products={adminScope.products}
        categories={adminScope.categories}
        imageOptions={PRODUCT_IMAGE_LIBRARY}
        restaurantId={adminScope.restaurant.id}
      />
    </AdminSectionShell>
  );
}

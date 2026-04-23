import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { MenuShell } from "@/components/public/menu-shell";
import { getRestaurantContentBySlug } from "@/data/repositories";
import { buildRestaurantThemeStyle } from "@/lib/restaurant-theme";
import { SUPPORTED_LOCALES } from "@/lib/site-config";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale
  }));
}

export default async function PublicMenuPage({ params }) {
  const { restaurant, locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const content = getRestaurantContentBySlug(restaurant);

  if (!content) {
    notFound();
  }

  return (
    <PublicShell
      eyebrow={content.restaurant.name}
      title={locale === "ru" ? "Меню" : "Menu"}
      description=""
      className="menu-stage"
      style={buildRestaurantThemeStyle(content.restaurant)}
    >
      <MenuShell
        restaurant={content.restaurant}
        locale={locale}
        categories={content.categories}
        products={content.products}
      />
    </PublicShell>
  );
}

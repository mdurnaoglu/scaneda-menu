import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { LanguageSelector } from "@/components/public/language-selector";
import { getRestaurantBySlug } from "@/data/repositories";
import { buildRestaurantThemeStyle } from "@/lib/restaurant-theme";

export default async function LanguageEntryPage({ params }) {
  const { restaurant } = await params;
  const restaurantEntity = getRestaurantBySlug(restaurant);

  if (!restaurantEntity) {
    notFound();
  }

  return (
    <PublicShell
      eyebrow={restaurantEntity.name}
      title="Select Language"
      description=""
      className="language-entry-stage"
      style={buildRestaurantThemeStyle(restaurantEntity)}
    >
      <LanguageSelector restaurant={restaurantEntity} />
    </PublicShell>
  );
}

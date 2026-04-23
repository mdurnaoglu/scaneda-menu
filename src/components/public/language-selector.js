import Link from "next/link";
import { Stack } from "@/components/primitives/stack";
import { PUBLIC_LANGUAGES } from "@/lib/site-config";

export function LanguageSelector({ restaurant }) {
  return (
    <Stack gap="sm">
      <div className="public-menu-navbar">
        <div className="public-menu-brand">
          <img className="public-menu-brand-logo" src={restaurant.logo} alt={restaurant.name} />
          <div className="public-menu-brand-copy">
            <span className="caption-text">Language Selection</span>
            <strong className="public-menu-brand-name">{restaurant.name}</strong>
          </div>
        </div>
      </div>

      {restaurant.coverImage ? (
        <div className="public-cover-hero">
          <img className="public-cover-image" src={restaurant.coverImage} alt={restaurant.name} />
          <div className="public-cover-overlay" />
          <div className="public-cover-center-logo">
            <img src={restaurant.logo} alt={restaurant.name} />
          </div>
        </div>
      ) : null}

      {PUBLIC_LANGUAGES.map((language) => (
        <Link
          key={language.code}
          href={`/${restaurant.slug}/${language.code}`}
          className="language-entry-button"
        >
          <div className="language-entry-copy">
            <span className="language-entry-label">{language.label}</span>
            <span className="language-entry-code">{language.code.toUpperCase()}</span>
          </div>
          <span className="language-entry-arrow">›</span>
        </Link>
      ))}
    </Stack>
  );
}

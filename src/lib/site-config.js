import { SUPPORTED_PUBLIC_LOCALES } from "@/types/content";

export const SUPPORTED_LOCALES = [...SUPPORTED_PUBLIC_LOCALES];
export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "scaneda.online";
export const ADMIN_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_DOMAIN ?? `admin.${APP_DOMAIN}`;
export const ADMIN_HOSTS = new Set([
  ADMIN_DOMAIN,
  "admin.localhost:3000",
  "admin.localhost:3001"
]);

export function buildPublicUrl(slug, locale = "lang") {
  return `${APP_DOMAIN}/${slug}/${locale}`;
}

export const PUBLIC_LANGUAGES = [
  {
    code: "en",
    label: "English",
    description: "Continue into the English menu experience."
  },
  {
    code: "ru",
    label: "Russian",
    description: "Continue into the Russian menu experience."
  }
];

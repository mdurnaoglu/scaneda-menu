export const SUPPORTED_PUBLIC_LOCALES = ["en", "ru"] as const;

export type PublicLocale = (typeof SUPPORTED_PUBLIC_LOCALES)[number];

export type UserId = string;
export type RestaurantId = string;
export type CategoryId = string;
export type ProductId = string;

export type EntityStatus = "active" | "inactive";
export type ThemeMode = "light" | "dark";

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface User {
  id: UserId;
  username: string;
  passwordHash: string;
  restaurantId: RestaurantId;
}

export interface Restaurant {
  id: RestaurantId;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  primaryColor: string;
  secondaryColor: string;
  themeMode: ThemeMode;
  status: EntityStatus;
}

export interface Category {
  id: CategoryId;
  restaurantId: RestaurantId;
  image: string;
  sortOrder: number;
  title: LocalizedText;
}

export interface Product {
  id: ProductId;
  restaurantId: RestaurantId;
  categoryId: CategoryId;
  image: string;
  price: number;
  sortOrder: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface RestaurantContent {
  restaurant: Restaurant;
  categories: Category[];
  products: Product[];
}

export interface AdminScope {
  user: User;
  restaurant: Restaurant;
  categories: Category[];
  products: Product[];
}

export interface AppSeedData {
  users: User[];
  restaurants: Restaurant[];
  categories: Category[];
  products: Product[];
}

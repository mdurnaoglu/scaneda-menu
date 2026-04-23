import { getAppData } from "@/data/store";
import type {
  AdminScope,
  Category,
  Product,
  PublicLocale,
  Restaurant,
  RestaurantContent,
  RestaurantId,
  User
} from "@/types/content";
import { SUPPORTED_PUBLIC_LOCALES } from "@/types/content";

export function getSupportedPublicLocales(): readonly PublicLocale[] {
  return SUPPORTED_PUBLIC_LOCALES;
}

export function getUserByUsername(username: string): User | undefined {
  return getAppData().users.find((user) => user.username === username);
}

export function getRestaurantById(restaurantId: RestaurantId): Restaurant | undefined {
  return getAppData().restaurants.find((restaurant) => restaurant.id === restaurantId);
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return getAppData().restaurants.find((restaurant) => restaurant.slug === slug);
}

export function getCategoriesByRestaurantId(restaurantId: RestaurantId): Category[] {
  return getAppData().categories
    .filter((category) => category.restaurantId === restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getProductsByRestaurantId(restaurantId: RestaurantId): Product[] {
  return getAppData().products
    .filter((product) => product.restaurantId === restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  return getAppData().products
    .filter((product) => product.categoryId === categoryId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getAdminScopeByUsername(username: string): AdminScope | undefined {
  const user = getUserByUsername(username);

  if (!user) {
    return undefined;
  }

  const restaurant = getRestaurantById(user.restaurantId);

  if (!restaurant) {
    return undefined;
  }

  return {
    user,
    restaurant,
    categories: getCategoriesByRestaurantId(restaurant.id),
    products: getProductsByRestaurantId(restaurant.id)
  };
}

export function getRestaurantContentBySlug(slug: string): RestaurantContent | undefined {
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    return undefined;
  }

  return {
    restaurant,
    categories: getCategoriesByRestaurantId(restaurant.id),
    products: getProductsByRestaurantId(restaurant.id)
  };
}

export function isSupportedLocale(locale: string): locale is PublicLocale {
  return SUPPORTED_PUBLIC_LOCALES.includes(locale as PublicLocale);
}

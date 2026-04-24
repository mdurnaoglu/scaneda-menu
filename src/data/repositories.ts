import { getAppData } from "@/data/store";
import { hasSupabaseServerEnv, getSupabaseServerClient } from "@/lib/supabase-server";
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

async function withSupabaseFallback<T>(
  fallback: () => T | Promise<T>,
  action: (supabase: any) => Promise<T>
): Promise<T> {
  if (!hasSupabaseServerEnv()) {
    return fallback();
  }

  try {
    const supabase = getSupabaseServerClient();
    return await action(supabase);
  } catch {
    return fallback();
  }
}

function mapRestaurant(row: any): Restaurant {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    logo: row.logo,
    coverImage: row.cover_image ?? undefined,
    primaryColor: row.primary_color,
    secondaryColor: row.secondary_color,
    themeMode: row.theme_mode,
    status: row.status
  };
}

function mapUser(row: any): User {
  return {
    id: row.id,
    username: row.username,
    passwordHash: row.password_hash,
    restaurantId: row.restaurant_id
  };
}

function mapCategory(row: any): Category {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    image: row.image,
    sortOrder: row.sort_order,
    title: {
      en: row.title_en,
      ru: row.title_ru
    }
  };
}

function mapProduct(row: any): Product {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    categoryId: row.category_id,
    image: row.image,
    price: Number(row.price),
    sortOrder: row.sort_order,
    title: {
      en: row.title_en,
      ru: row.title_ru
    },
    description: {
      en: row.description_en,
      ru: row.description_ru
    }
  };
}

export function getSupportedPublicLocales(): readonly PublicLocale[] {
  return SUPPORTED_PUBLIC_LOCALES;
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  return withSupabaseFallback(
    () => getAppData().users.find((user) => user.username === username),
    async (supabase) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error || !data) {
        return undefined;
      }

      return mapUser(data);
    }
  );
}

export async function getRestaurantById(restaurantId: RestaurantId): Promise<Restaurant | undefined> {
  return withSupabaseFallback(
    () => getAppData().restaurants.find((restaurant) => restaurant.id === restaurantId),
    async (supabase) => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", restaurantId)
        .maybeSingle();

      if (error || !data) {
        return undefined;
      }

      return mapRestaurant(data);
    }
  );
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
  return withSupabaseFallback(
    () => getAppData().restaurants.find((restaurant) => restaurant.slug === slug),
    async (supabase) => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        return undefined;
      }

      return mapRestaurant(data);
    }
  );
}

export async function getCategoriesByRestaurantId(restaurantId: RestaurantId): Promise<Category[]> {
  return withSupabaseFallback(
    () =>
      getAppData().categories
        .filter((category) => category.restaurantId === restaurantId)
        .sort((left, right) => left.sortOrder - right.sortOrder),
    async (supabase) => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .order("sort_order", { ascending: true });

      if (error || !data) {
        return [];
      }

      return data.map(mapCategory);
    }
  );
}

export async function getProductsByRestaurantId(restaurantId: RestaurantId): Promise<Product[]> {
  return withSupabaseFallback(
    () =>
      getAppData().products
        .filter((product) => product.restaurantId === restaurantId)
        .sort((left, right) => left.sortOrder - right.sortOrder),
    async (supabase) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .order("sort_order", { ascending: true });

      if (error || !data) {
        return [];
      }

      return data.map(mapProduct);
    }
  );
}

export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  return withSupabaseFallback(
    () =>
      getAppData().products
        .filter((product) => product.categoryId === categoryId)
        .sort((left, right) => left.sortOrder - right.sortOrder),
    async (supabase) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId)
        .order("sort_order", { ascending: true });

      if (error || !data) {
        return [];
      }

      return data.map(mapProduct);
    }
  );
}

export async function getAdminScopeByUsername(username: string): Promise<AdminScope | undefined> {
  const user = await getUserByUsername(username);

  if (!user) {
    return undefined;
  }

  const restaurant = await getRestaurantById(user.restaurantId);

  if (!restaurant) {
    return undefined;
  }

  const [categories, products] = await Promise.all([
    getCategoriesByRestaurantId(restaurant.id),
    getProductsByRestaurantId(restaurant.id)
  ]);

  return {
    user,
    restaurant,
    categories,
    products
  };
}

export async function getRestaurantContentBySlug(slug: string): Promise<RestaurantContent | undefined> {
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return undefined;
  }

  const [categories, products] = await Promise.all([
    getCategoriesByRestaurantId(restaurant.id),
    getProductsByRestaurantId(restaurant.id)
  ]);

  return {
    restaurant,
    categories,
    products
  };
}

export function isSupportedLocale(locale: string): locale is PublicLocale {
  return SUPPORTED_PUBLIC_LOCALES.includes(locale as PublicLocale);
}

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { seedData } from "@/data/seed";
import type { AppSeedData, Category, Product, Restaurant, RestaurantId } from "@/types/content";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const DATA_FILE_PATH = path.join(DATA_DIRECTORY, "app-data.json");

function ensureDataFile() {
  if (!existsSync(DATA_DIRECTORY)) {
    mkdirSync(DATA_DIRECTORY, { recursive: true });
  }

  if (!existsSync(DATA_FILE_PATH)) {
    writeFileSync(DATA_FILE_PATH, JSON.stringify(seedData, null, 2), "utf8");
  }
}

function readDataFile(): AppSeedData {
  ensureDataFile();

  try {
    return JSON.parse(readFileSync(DATA_FILE_PATH, "utf8")) as AppSeedData;
  } catch {
    const fallbackData = structuredClone(seedData);
    writeFileSync(DATA_FILE_PATH, JSON.stringify(fallbackData, null, 2), "utf8");
    return fallbackData;
  }
}

function writeDataFile(data: AppSeedData) {
  ensureDataFile();
  writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

function withMutableData<T>(mutate: (data: AppSeedData) => T): T {
  const data = readDataFile();
  const result = mutate(data);
  writeDataFile(data);
  return result;
}

function sortCategoriesForRestaurant(data: AppSeedData, restaurantId: RestaurantId) {
  const scopedCategories = data.categories
    .filter((category) => category.restaurantId === restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);

  scopedCategories.forEach((category, index) => {
    const target = data.categories.find((item) => item.id === category.id);

    if (target) {
      target.sortOrder = index + 1;
    }
  });
}

function sortProductsForRestaurant(data: AppSeedData, restaurantId: RestaurantId) {
  const scopedProducts = data.products
    .filter((product) => product.restaurantId === restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);

  scopedProducts.forEach((product, index) => {
    const target = data.products.find((item) => item.id === product.id);

    if (target) {
      target.sortOrder = index + 1;
    }
  });
}

function moveCategoryToPositionInData(data: AppSeedData, categoryId: string, nextSortOrder: number) {
  const category = data.categories.find((item) => item.id === categoryId);

  if (!category) {
    return false;
  }

  const scopedCategories = data.categories
    .filter((item) => item.restaurantId === category.restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
  const currentIndex = scopedCategories.findIndex((item) => item.id === categoryId);
  const safeIndex = Math.max(0, Math.min(scopedCategories.length - 1, nextSortOrder - 1));

  if (currentIndex < 0) {
    return false;
  }

  const [currentItem] = scopedCategories.splice(currentIndex, 1);
  scopedCategories.splice(safeIndex, 0, currentItem);

  scopedCategories.forEach((item, index) => {
    const target = data.categories.find((categoryItem) => categoryItem.id === item.id);

    if (target) {
      target.sortOrder = index + 1;
    }
  });

  return true;
}

function moveProductToPositionInData(data: AppSeedData, productId: string, nextSortOrder: number) {
  const product = data.products.find((item) => item.id === productId);

  if (!product) {
    return false;
  }

  const scopedProducts = data.products
    .filter((item) => item.restaurantId === product.restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
  const currentIndex = scopedProducts.findIndex((item) => item.id === productId);
  const safeIndex = Math.max(0, Math.min(scopedProducts.length - 1, nextSortOrder - 1));

  if (currentIndex < 0) {
    return false;
  }

  const [currentItem] = scopedProducts.splice(currentIndex, 1);
  scopedProducts.splice(safeIndex, 0, currentItem);

  scopedProducts.forEach((item, index) => {
    const target = data.products.find((productItem) => productItem.id === item.id);

    if (target) {
      target.sortOrder = index + 1;
    }
  });

  return true;
}

function buildCategoryId() {
  return `cat_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function buildProductId() {
  return `prod_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function getAppData() {
  return readDataFile();
}

export function updateRestaurant(restaurantId: string, input: Omit<Restaurant, "id">) {
  return withMutableData((data) => {
    const restaurant = data.restaurants.find((item) => item.id === restaurantId);

    if (!restaurant) {
      return undefined;
    }

    restaurant.name = input.name;
    restaurant.slug = input.slug;
    restaurant.logo = input.logo;
    restaurant.coverImage = input.coverImage;
    restaurant.primaryColor = input.primaryColor;
    restaurant.secondaryColor = input.secondaryColor;
    restaurant.themeMode = input.themeMode;
    restaurant.status = input.status;

    return restaurant;
  });
}

export function createCategory(input: Omit<Category, "id">) {
  return withMutableData((data) => {
    const category: Category = {
      id: buildCategoryId(),
      ...input
    };

    data.categories.push(category);
    sortCategoriesForRestaurant(data, category.restaurantId);
    moveCategoryToPositionInData(data, category.id, category.sortOrder);

    return category;
  });
}

export function updateCategory(categoryId: string, input: Omit<Category, "id" | "restaurantId">) {
  return withMutableData((data) => {
    const category = data.categories.find((item) => item.id === categoryId);

    if (!category) {
      return undefined;
    }

    category.image = input.image;
    category.title = input.title;
    category.sortOrder = input.sortOrder;

    sortCategoriesForRestaurant(data, category.restaurantId);
    moveCategoryToPositionInData(data, category.id, input.sortOrder);

    return category;
  });
}

export function deleteCategory(categoryId: string) {
  return withMutableData((data) => {
    const category = data.categories.find((item) => item.id === categoryId);

    if (!category) {
      return false;
    }

    data.categories = data.categories.filter((item) => item.id !== categoryId);
    data.products = data.products.filter((product) => product.categoryId !== categoryId);
    sortCategoriesForRestaurant(data, category.restaurantId);

    return true;
  });
}

export function moveCategory(categoryId: string, direction: "up" | "down") {
  return withMutableData((data) => {
    const category = data.categories.find((item) => item.id === categoryId);

    if (!category) {
      return false;
    }

    const scopedCategories = data.categories
      .filter((item) => item.restaurantId === category.restaurantId)
      .sort((left, right) => left.sortOrder - right.sortOrder);
    const currentIndex = scopedCategories.findIndex((item) => item.id === categoryId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= scopedCategories.length) {
      return false;
    }

    const [currentItem] = scopedCategories.splice(currentIndex, 1);
    scopedCategories.splice(targetIndex, 0, currentItem);

    scopedCategories.forEach((item, index) => {
      const target = data.categories.find((categoryItem) => categoryItem.id === item.id);

      if (target) {
        target.sortOrder = index + 1;
      }
    });

    return true;
  });
}

export function moveCategoryToPosition(categoryId: string, nextSortOrder: number) {
  return withMutableData((data) => moveCategoryToPositionInData(data, categoryId, nextSortOrder));
}

export function createProduct(input: Omit<Product, "id">) {
  return withMutableData((data) => {
    const product: Product = {
      id: buildProductId(),
      ...input
    };

    data.products.push(product);
    sortProductsForRestaurant(data, product.restaurantId);
    moveProductToPositionInData(data, product.id, product.sortOrder);

    return product;
  });
}

export function updateProduct(productId: string, input: Omit<Product, "id" | "restaurantId">) {
  return withMutableData((data) => {
    const product = data.products.find((item) => item.id === productId);

    if (!product) {
      return undefined;
    }

    product.categoryId = input.categoryId;
    product.image = input.image;
    product.price = input.price;
    product.sortOrder = input.sortOrder;
    product.title = input.title;
    product.description = input.description;

    sortProductsForRestaurant(data, product.restaurantId);
    moveProductToPositionInData(data, product.id, input.sortOrder);

    return product;
  });
}

export function deleteProduct(productId: string) {
  return withMutableData((data) => {
    const product = data.products.find((item) => item.id === productId);

    if (!product) {
      return false;
    }

    data.products = data.products.filter((item) => item.id !== productId);
    sortProductsForRestaurant(data, product.restaurantId);

    return true;
  });
}

export function moveProduct(productId: string, direction: "up" | "down") {
  return withMutableData((data) => {
    const product = data.products.find((item) => item.id === productId);

    if (!product) {
      return false;
    }

    const scopedProducts = data.products
      .filter((item) => item.restaurantId === product.restaurantId)
      .sort((left, right) => left.sortOrder - right.sortOrder);
    const currentIndex = scopedProducts.findIndex((item) => item.id === productId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= scopedProducts.length) {
      return false;
    }

    const [currentItem] = scopedProducts.splice(currentIndex, 1);
    scopedProducts.splice(targetIndex, 0, currentItem);

    scopedProducts.forEach((item, index) => {
      const target = data.products.find((productItem) => productItem.id === item.id);

      if (target) {
        target.sortOrder = index + 1;
      }
    });

    return true;
  });
}

export function moveProductToPosition(productId: string, nextSortOrder: number) {
  return withMutableData((data) => moveProductToPositionInData(data, productId, nextSortOrder));
}

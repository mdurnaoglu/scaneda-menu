import type { AppSeedData } from "@/types/content";
import { CATEGORY_IMAGE_LIBRARY } from "@/data/category-images";
import { PRODUCT_IMAGE_LIBRARY } from "@/data/product-images";
import { RESTAURANT_COVER_LIBRARY, RESTAURANT_LOGO_LIBRARY } from "@/data/restaurant-images";

export const seedData: AppSeedData = {
  users: [
    {
      id: "user_01",
      username: "atelier.moscow",
      passwordHash:
        "scrypt$46cbb0d138a6e78ed07b8426d4beb03f$7142551878734bf9ae27bfd56648e3335a5d7e499c8d7d7edc5fcdb4f50a059542b33e0548e341c14950ad1bbb70bfa638778ee35e8268facde4522814a78863",
      restaurantId: "rest_01"
    },
    {
      id: "user_02",
      username: "MD.Sochi",
      passwordHash:
        "scrypt$99373d75289214cbd247f186e1781da0$9b06436777ffdbe5e26d3b62376648ef16e003ef101cbb503fab28bb8242d12e6ef7a8d2ad1d4d8db84351c9e126cc90cd312591bfdf9e67441ff0e382fc888f",
      restaurantId: "rest_02"
    }
  ],
  restaurants: [
    {
      id: "rest_01",
      name: "Atelier",
      slug: "atelier",
      logo: RESTAURANT_LOGO_LIBRARY[0].src,
      coverImage: RESTAURANT_COVER_LIBRARY[0].src,
      primaryColor: "#171717",
      secondaryColor: "#c8a06a",
      themeMode: "light",
      status: "active"
    },
    {
      id: "rest_02",
      name: "MD Sochi",
      slug: "md-sochi",
      logo: RESTAURANT_LOGO_LIBRARY[1].src,
      coverImage: RESTAURANT_COVER_LIBRARY[1].src,
      primaryColor: "#16324f",
      secondaryColor: "#c88b4a",
      themeMode: "light",
      status: "active"
    }
  ],
  categories: [
    {
      id: "cat_01",
      restaurantId: "rest_01",
      image: CATEGORY_IMAGE_LIBRARY[0].src,
      sortOrder: 1,
      title: {
        en: "Signature Coffee",
        ru: "Авторский кофе"
      }
    },
    {
      id: "cat_02",
      restaurantId: "rest_01",
      image: CATEGORY_IMAGE_LIBRARY[1].src,
      sortOrder: 2,
      title: {
        en: "Pastry",
        ru: "Выпечка"
      }
    },
    {
      id: "cat_03",
      restaurantId: "rest_02",
      image: CATEGORY_IMAGE_LIBRARY[0].src,
      sortOrder: 1,
      title: {
        en: "Coffee",
        ru: "Кофе"
      }
    },
    {
      id: "cat_04",
      restaurantId: "rest_02",
      image: CATEGORY_IMAGE_LIBRARY[1].src,
      sortOrder: 2,
      title: {
        en: "Croissant",
        ru: "Круассаны"
      }
    }
  ],
  products: [
    {
      id: "prod_01",
      restaurantId: "rest_01",
      categoryId: "cat_01",
      image: PRODUCT_IMAGE_LIBRARY[0].src,
      price: 360,
      sortOrder: 1,
      title: {
        en: "Milk Foam Latte",
        ru: "Латте с молочной пеной"
      },
      description: {
        en: "Silky espresso with textured milk and a clean finish.",
        ru: "Нежный эспрессо со взбитым молоком и чистым послевкусием."
      }
    },
    {
      id: "prod_02",
      restaurantId: "rest_01",
      categoryId: "cat_01",
      image: PRODUCT_IMAGE_LIBRARY[1].src,
      price: 340,
      sortOrder: 2,
      title: {
        en: "Citrus Filter",
        ru: "Цитрусовый фильтр"
      },
      description: {
        en: "Bright filter coffee with soft citrus aromatics.",
        ru: "Яркий фильтр-кофе с мягкими цитрусовыми нотами."
      }
    },
    {
      id: "prod_03",
      restaurantId: "rest_01",
      categoryId: "cat_02",
      image: PRODUCT_IMAGE_LIBRARY[2].src,
      price: 290,
      sortOrder: 1,
      title: {
        en: "Butter Croissant",
        ru: "Масляный круассан"
      },
      description: {
        en: "Layered laminated pastry with a delicate crisp shell.",
        ru: "Слоеная выпечка с тонкой хрустящей корочкой."
      }
    },
    {
      id: "prod_04",
      restaurantId: "rest_02",
      categoryId: "cat_03",
      image: PRODUCT_IMAGE_LIBRARY[0].src,
      price: 280,
      sortOrder: 1,
      title: {
        en: "Flat White",
        ru: "Флэт Уайт"
      },
      description: {
        en: "Balanced espresso with silky milk and a smooth, rounded body.",
        ru: "Сбалансированный эспрессо с шелковистым молоком и мягким округлым вкусом."
      }
    },
    {
      id: "prod_05",
      restaurantId: "rest_02",
      categoryId: "cat_04",
      image: PRODUCT_IMAGE_LIBRARY[2].src,
      price: 240,
      sortOrder: 1,
      title: {
        en: "Butter Croissant",
        ru: "Масляный круассан"
      },
      description: {
        en: "Classic laminated croissant with crisp layers and a rich butter finish.",
        ru: "Классический круассан с хрустящими слоями и насыщенным сливочным вкусом."
      }
    }
  ]
};

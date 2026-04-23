"use server";

import { revalidatePath } from "next/cache";
import { createProduct, deleteProduct, moveProduct, updateProduct } from "@/data/store";

function normalizeSortOrder(value: FormDataEntryValue | null) {
  const parsed = Number(String(value ?? "").trim());

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
}

function normalizePrice(value: FormDataEntryValue | null) {
  const parsed = Number(String(value ?? "").trim());

  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.round(parsed * 100) / 100;
}

async function resolveProductImage(formData: FormData) {
  const uploadedFile = formData.get("imageFile");
  const presetImage = String(formData.get("imagePreset") ?? "").trim();
  const existingImage = String(formData.get("existingImage") ?? "").trim();

  if (uploadedFile instanceof File && uploadedFile.size > 0) {
    if (!uploadedFile.type.startsWith("image/")) {
      return { error: "Please upload a valid image file." };
    }

    const buffer = Buffer.from(await uploadedFile.arrayBuffer());

    return { value: `data:${uploadedFile.type};base64,${buffer.toString("base64")}` };
  }

  if (presetImage) {
    return { value: presetImage };
  }

  if (existingImage) {
    return { value: existingImage };
  }

  return { error: "Product image is required." };
}

function revalidateProductViews() {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

export async function saveProduct(_previousState: unknown, formData: FormData) {
  const mode = String(formData.get("mode") ?? "create");
  const productId = String(formData.get("productId") ?? "");
  const restaurantId = String(formData.get("restaurantId") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleRu = String(formData.get("titleRu") ?? "").trim();
  const descriptionEn = String(formData.get("descriptionEn") ?? "").trim();
  const descriptionRu = String(formData.get("descriptionRu") ?? "").trim();
  const sortOrder = normalizeSortOrder(formData.get("sortOrder"));
  const price = normalizePrice(formData.get("price"));
  const imageResult = await resolveProductImage(formData);
  const fieldErrors: Record<string, string> = {};

  if (!categoryId) {
    fieldErrors.categoryId = "Category is required.";
  }

  if (!titleEn) {
    fieldErrors.titleEn = "English title is required.";
  }

  if (!titleRu) {
    fieldErrors.titleRu = "Russian title is required.";
  }

  if (!descriptionEn) {
    fieldErrors.descriptionEn = "English description is required.";
  }

  if (!descriptionRu) {
    fieldErrors.descriptionRu = "Russian description is required.";
  }

  if (sortOrder === null) {
    fieldErrors.sortOrder = "Sort order must be 1 or greater.";
  }

  if (price === null) {
    fieldErrors.price = "Price must be 0 or greater.";
  }

  if (imageResult.error) {
    fieldErrors.image = imageResult.error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      message: "Review the highlighted fields and try again."
    };
  }

  const imageValue = imageResult.value ?? "";
  const sortOrderValue = sortOrder ?? 1;
  const priceValue = price ?? 0;

  if (mode === "edit" && productId) {
    const updatedProduct = updateProduct(productId, {
      categoryId,
      image: imageValue,
      price: priceValue,
      sortOrder: sortOrderValue,
      title: {
        en: titleEn,
        ru: titleRu
      },
      description: {
        en: descriptionEn,
        ru: descriptionRu
      }
    });

    if (!updatedProduct) {
      return {
        status: "error",
        fieldErrors: {},
        message: "Product could not be updated."
      };
    }
  } else {
    createProduct({
      restaurantId,
      categoryId,
      image: imageValue,
      price: priceValue,
      sortOrder: sortOrderValue,
      title: {
        en: titleEn,
        ru: titleRu
      },
      description: {
        en: descriptionEn,
        ru: descriptionRu
      }
    });
  }

  revalidateProductViews();

  return {
    status: "success",
    fieldErrors: {},
    message: mode === "edit" ? "Product updated." : "Product created.",
    mode
  };
}

export async function removeProduct(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");

  if (!productId) {
    return;
  }

  deleteProduct(productId);
  revalidateProductViews();
}

export async function reorderProduct(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const direction = String(formData.get("direction") ?? "") as "up" | "down";

  if (!productId || (direction !== "up" && direction !== "down")) {
    return;
  }

  moveProduct(productId, direction);
  revalidateProductViews();
}

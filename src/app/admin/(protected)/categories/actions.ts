"use server";

import { revalidatePath } from "next/cache";
import { createCategory, deleteCategory, moveCategory, updateCategory } from "@/data/store";

function normalizeSortOrder(value: FormDataEntryValue | null) {
  const parsed = Number(String(value ?? "").trim());

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
}

async function resolveCategoryImage(formData: FormData) {
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

  return { error: "Category image is required." };
}

function revalidateCategoryViews() {
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}

export async function saveCategory(_previousState: unknown, formData: FormData) {
  const mode = String(formData.get("mode") ?? "create");
  const categoryId = String(formData.get("categoryId") ?? "");
  const restaurantId = String(formData.get("restaurantId") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleRu = String(formData.get("titleRu") ?? "").trim();
  const sortOrder = normalizeSortOrder(formData.get("sortOrder"));
  const imageResult = await resolveCategoryImage(formData);
  const fieldErrors: Record<string, string> = {};

  if (!titleEn) {
    fieldErrors.titleEn = "English title is required.";
  }

  if (!titleRu) {
    fieldErrors.titleRu = "Russian title is required.";
  }

  if (!sortOrder) {
    fieldErrors.sortOrder = "Sort order must be 1 or greater.";
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

  if (mode === "edit" && categoryId) {
    const updatedCategory = updateCategory(categoryId, {
      image: imageValue,
      sortOrder: sortOrderValue,
      title: {
        en: titleEn,
        ru: titleRu
      }
    });

    if (!updatedCategory) {
      return {
        status: "error",
        fieldErrors: {},
        message: "Category could not be updated."
      };
    }
  } else {
    createCategory({
      restaurantId,
      image: imageValue,
      sortOrder: sortOrderValue,
      title: {
        en: titleEn,
        ru: titleRu
      }
    });
  }

  revalidateCategoryViews();

  return {
    status: "success",
    fieldErrors: {},
    message: mode === "edit" ? "Category updated." : "Category created.",
    mode
  };
}

export async function removeCategory(formData: FormData) {
  const categoryId = String(formData.get("categoryId") ?? "");

  if (!categoryId) {
    return;
  }

  deleteCategory(categoryId);
  revalidateCategoryViews();
}

export async function reorderCategory(formData: FormData) {
  const categoryId = String(formData.get("categoryId") ?? "");
  const direction = String(formData.get("direction") ?? "") as "up" | "down";

  if (!categoryId || (direction !== "up" && direction !== "down")) {
    return;
  }

  moveCategory(categoryId, direction);
  revalidateCategoryViews();
}

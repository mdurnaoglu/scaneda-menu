"use server";

import { revalidatePath } from "next/cache";
import { updateRestaurant } from "@/data/store";
import type { EntityStatus, ThemeMode } from "@/types/content";

async function resolveImage({
  file,
  preset,
  existing,
  required
}: {
  file: FormDataEntryValue | null;
  preset: string;
  existing: string;
  required: boolean;
}) {
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return { error: "Please upload a valid image file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    return { value: `data:${file.type};base64,${buffer.toString("base64")}` };
  }

  if (preset) {
    return { value: preset };
  }

  if (existing) {
    return { value: existing };
  }

  if (required) {
    return { error: "This image is required." };
  }

  return { value: "" };
}

function isValidSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isValidHexColor(value: string) {
  return /^#([0-9a-f]{6})$/i.test(value);
}

export async function saveRestaurantSettings(_previousState: unknown, formData: FormData) {
  const restaurantId = String(formData.get("restaurantId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const previousSlug = String(formData.get("previousSlug") ?? "").trim().toLowerCase();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const status = String(formData.get("status") ?? "active") as EntityStatus;
  const themeMode = String(formData.get("themeMode") ?? "light") as ThemeMode;
  const primaryColor = String(formData.get("primaryColor") ?? "").trim().toLowerCase();
  const secondaryColor = String(formData.get("secondaryColor") ?? "").trim().toLowerCase();
  const logoResult = await resolveImage({
    file: formData.get("logoFile"),
    preset: String(formData.get("logoPreset") ?? "").trim(),
    existing: String(formData.get("existingLogo") ?? "").trim(),
    required: true
  });
  const coverResult = await resolveImage({
    file: formData.get("coverFile"),
    preset: String(formData.get("coverPreset") ?? "").trim(),
    existing: String(formData.get("existingCover") ?? "").trim(),
    required: false
  });
  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Restaurant name is required.";
  }

  if (!slug) {
    fieldErrors.slug = "Slug is required.";
  } else if (!isValidSlug(slug)) {
    fieldErrors.slug = "Use lowercase letters, numbers, and single hyphens only.";
  }

  if (status !== "active" && status !== "inactive") {
    fieldErrors.status = "Choose a valid visibility state.";
  }

  if (themeMode !== "light" && themeMode !== "dark") {
    fieldErrors.themeMode = "Choose a valid theme mode.";
  }

  if (!isValidHexColor(primaryColor)) {
    fieldErrors.primaryColor = "Use a valid 6-digit hex color.";
  }

  if (!isValidHexColor(secondaryColor)) {
    fieldErrors.secondaryColor = "Use a valid 6-digit hex color.";
  }

  if (logoResult.error) {
    fieldErrors.logo = logoResult.error;
  }

  if (coverResult.error) {
    fieldErrors.coverImage = coverResult.error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      message: "Review the highlighted fields and try again."
    };
  }

  const updatedRestaurant = updateRestaurant(restaurantId, {
    name,
    slug,
    logo: logoResult.value ?? "",
    coverImage: coverResult.value || undefined,
    primaryColor,
    secondaryColor,
    themeMode,
    status
  });

  if (!updatedRestaurant) {
    return {
      status: "error",
      fieldErrors: {},
      message: "Settings could not be saved."
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  if (previousSlug && previousSlug !== updatedRestaurant.slug) {
    revalidatePath(`/${previousSlug}/lang`);
    revalidatePath(`/${previousSlug}/en`);
    revalidatePath(`/${previousSlug}/ru`);
  }
  revalidatePath(`/${updatedRestaurant.slug}/lang`);
  revalidatePath(`/${updatedRestaurant.slug}/en`);
  revalidatePath(`/${updatedRestaurant.slug}/ru`);

  return {
    status: "success",
    fieldErrors: {},
    message: "Restaurant settings saved."
  };
}

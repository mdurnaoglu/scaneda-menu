"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { removeCategory, reorderCategory, saveCategory } from "@/app/admin/(protected)/categories/actions";
import { Stack } from "@/components/primitives/stack";

const initialFormState = {
  status: "idle",
  fieldErrors: {},
  message: ""
};

export function CategoryManager({ categories, imageOptions, restaurantId }) {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? null);
  const [formMode, setFormMode] = useState(categories.length > 0 ? "edit" : "create");
  const [isEditorOpen, setIsEditorOpen] = useState(categories.length === 0);
  const [selectedPreset, setSelectedPreset] = useState(categories[0]?.image ?? imageOptions[0]?.src ?? "");
  const [filePreview, setFilePreview] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [formState, formAction] = useActionState(saveCategory, initialFormState);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId]
  );

  useEffect(() => {
    if (formState.status !== "success") {
      return;
    }

    router.refresh();
    setIsEditorOpen(false);

    if (formState.mode === "create") {
      setSelectedCategoryId(categories[0]?.id ?? null);
      setFormMode("create");
      setSelectedPreset(imageOptions[0]?.src ?? "");
      setFilePreview("");
      setResetKey((value) => value + 1);
    }
  }, [categories, formState, imageOptions, router]);

  useEffect(() => {
    if (!selectedCategory && categories.length > 0 && formMode === "edit") {
      setSelectedCategoryId(categories[0].id);
    }

    if (!selectedCategory && categories.length === 0) {
      setFormMode("create");
      setSelectedPreset(imageOptions[0]?.src ?? "");
      setIsEditorOpen(true);
    }
  }, [categories, formMode, imageOptions, selectedCategory]);

  useEffect(() => {
    if (formMode === "edit" && selectedCategory) {
      setSelectedPreset(selectedCategory.image);
      setFilePreview("");
    }
  }, [formMode, selectedCategory]);

  const handleCreateIntent = () => {
    setFormMode("create");
    setSelectedCategoryId(null);
    setSelectedPreset(imageOptions[0]?.src ?? "");
    setFilePreview("");
    setResetKey((value) => value + 1);
    setIsEditorOpen(true);
  };

  const handleEditIntent = (categoryId) => {
    setFormMode("edit");
    setSelectedCategoryId(categoryId);
    setFilePreview("");
    setResetKey((value) => value + 1);
    setIsEditorOpen(true);
  };

  return (
    <>
      <div className="category-manager category-manager-single">
        <div className="category-list-panel">
          <Stack gap="md">
            <div className="category-toolbar">
              <div>
                <h2 className="card-title">Categories</h2>
                <p className="body-text">Quick list with inline ordering and focused editing.</p>
              </div>

              <button className="admin-primary-button" type="button" onClick={handleCreateIntent}>
                Create Category
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="category-empty-state">
                <Stack gap="sm">
                  <h3 className="card-title">No categories yet.</h3>
                  <p className="body-text">
                    Start by creating the first category for the public menu structure.
                  </p>
                </Stack>
              </div>
            ) : (
              <div className="category-list">
                <div className="category-list-header">
                  <span>Image</span>
                  <span>English</span>
                  <span>Russian</span>
                  <span>Sort</span>
                  <span>Actions</span>
                </div>

                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`category-row ${selectedCategoryId === category.id && formMode === "edit" ? "category-row-active" : ""}`}
                  >
                    <div className="category-thumb-wrap">
                      <img className="category-thumb" src={category.image} alt={category.title.en} />
                    </div>
                    <div className="category-text-cell">
                      <span className="category-cell-strong">{category.title.en}</span>
                    </div>
                    <div className="category-text-cell">
                      <span className="category-cell-muted">{category.title.ru}</span>
                    </div>
                    <span className="category-cell-muted">{category.sortOrder}</span>
                    <div className="category-row-actions">
                      <form action={reorderCategory}>
                        <input type="hidden" name="categoryId" value={category.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button className="admin-icon-button" type="submit" disabled={index === 0}>
                          Up
                        </button>
                      </form>
                      <form action={reorderCategory}>
                        <input type="hidden" name="categoryId" value={category.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button
                          className="admin-icon-button"
                          type="submit"
                          disabled={index === categories.length - 1}
                        >
                          Down
                        </button>
                      </form>
                      <button
                        className="admin-secondary-button"
                        type="button"
                        onClick={() => handleEditIntent(category.id)}
                      >
                        Quick Edit
                      </button>
                      <form action={removeCategory}>
                        <input type="hidden" name="categoryId" value={category.id} />
                        <button className="admin-danger-button" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Stack>
        </div>
      </div>

      {isEditorOpen ? (
        <div className="admin-modal-backdrop" role="presentation" onClick={() => setIsEditorOpen(false)}>
          <div
            className="admin-modal-panel category-quick-edit-panel"
            role="dialog"
            aria-modal="true"
            aria-label={formMode === "edit" ? "Quick edit category" : "Create category"}
            onClick={(event) => event.stopPropagation()}
          >
            <Stack gap="lg">
              <div className="admin-modal-header">
                <div>
                  <p className="eyebrow">{formMode === "edit" ? "Quick Edit" : "Create Category"}</p>
                  <h2 className="card-title">
                    {formMode === "edit" ? "Update category details" : "Add a new category"}
                  </h2>
                </div>

                <button
                  className="admin-modal-close"
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  aria-label="Close quick edit"
                >
                  ×
                </button>
              </div>

              <form key={resetKey} action={formAction} className="category-form">
                <input type="hidden" name="mode" value={formMode} />
                <input type="hidden" name="restaurantId" value={restaurantId} />
                <input type="hidden" name="categoryId" value={selectedCategory?.id ?? ""} />
                <input type="hidden" name="existingImage" value={selectedCategory?.image ?? ""} />

                <Stack gap="md">
                  <div className="auth-field">
                    <span className="auth-label">Image</span>
                    <div className="category-preview-frame">
                      <img
                        className="category-preview-image"
                        src={
                          filePreview ||
                          selectedPreset ||
                          selectedCategory?.image ||
                          imageOptions[0]?.src
                        }
                        alt="Category preview"
                      />
                    </div>

                    <div className="category-image-grid">
                      {imageOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`category-image-option ${selectedPreset === option.src && !filePreview ? "category-image-option-active" : ""}`}
                        >
                          <input
                            className="category-image-radio"
                            type="radio"
                            name="imagePreset"
                            value={option.src}
                            defaultChecked={
                              formMode === "edit"
                                ? selectedCategory?.image === option.src
                                : option.src === imageOptions[0]?.src
                            }
                            onChange={() => {
                              setSelectedPreset(option.src);
                              setFilePreview("");
                            }}
                          />
                          <img src={option.src} alt={option.label} className="category-image-option-thumb" />
                          <span className="caption-text">{option.label}</span>
                        </label>
                      ))}
                    </div>

                    <input
                      className="auth-input"
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (!file) {
                          setFilePreview("");
                          return;
                        }

                        setFilePreview(URL.createObjectURL(file));
                      }}
                    />
                    {formState.fieldErrors.image ? (
                      <span className="auth-message auth-message-error">{formState.fieldErrors.image}</span>
                    ) : null}
                  </div>

                  <label className="auth-field">
                    <span className="auth-label">English title</span>
                    <input
                      className={`auth-input ${formState.fieldErrors.titleEn ? "auth-input-error" : ""}`}
                      name="titleEn"
                      type="text"
                      placeholder="Signature Coffee"
                      defaultValue={selectedCategory?.title.en ?? ""}
                    />
                    {formState.fieldErrors.titleEn ? (
                      <span className="auth-message auth-message-error">{formState.fieldErrors.titleEn}</span>
                    ) : null}
                  </label>

                  <label className="auth-field">
                    <span className="auth-label">Russian title</span>
                    <input
                      className={`auth-input ${formState.fieldErrors.titleRu ? "auth-input-error" : ""}`}
                      name="titleRu"
                      type="text"
                      placeholder="Авторский кофе"
                      defaultValue={selectedCategory?.title.ru ?? ""}
                    />
                    {formState.fieldErrors.titleRu ? (
                      <span className="auth-message auth-message-error">{formState.fieldErrors.titleRu}</span>
                    ) : null}
                  </label>

                  <label className="auth-field">
                    <span className="auth-label">Sort order</span>
                    <input
                      className={`auth-input ${formState.fieldErrors.sortOrder ? "auth-input-error" : ""}`}
                      name="sortOrder"
                      type="number"
                      min="1"
                      defaultValue={selectedCategory?.sortOrder ?? categories.length + 1}
                    />
                    {formState.fieldErrors.sortOrder ? (
                      <span className="auth-message auth-message-error">
                        {formState.fieldErrors.sortOrder}
                      </span>
                    ) : null}
                  </label>

                  {formState.message ? (
                    <div
                      className={`auth-alert ${formState.status === "success" ? "auth-alert-success" : ""}`}
                      role="status"
                    >
                      {formState.message}
                    </div>
                  ) : null}

                  <div className="category-form-actions">
                    <button className="admin-primary-button" type="submit">
                      {formMode === "edit" ? "Save Changes" : "Create Category"}
                    </button>
                    {formMode === "edit" ? (
                      <button className="admin-secondary-button" type="button" onClick={handleCreateIntent}>
                        New Category
                      </button>
                    ) : null}
                  </div>
                </Stack>
              </form>
            </Stack>
          </div>
        </div>
      ) : null}
    </>
  );
}

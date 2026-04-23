"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeProduct, reorderProduct, saveProduct } from "@/app/admin/(protected)/products/actions";
import { Stack } from "@/components/primitives/stack";

const initialFormState = {
  status: "idle",
  fieldErrors: {},
  message: ""
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function getCategoryName(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)?.title.en ?? "Unassigned";
}

function getCategory(categories, categoryId) {
  return categories.find((category) => category.id === categoryId) ?? null;
}

export function ProductManager({ products, categories, imageOptions, restaurantId }) {
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? null);
  const [formMode, setFormMode] = useState(products.length > 0 ? "edit" : "create");
  const [selectedCategoryId, setSelectedCategoryId] = useState(products[0]?.categoryId ?? categories[0]?.id ?? "");
  const [selectedPreset, setSelectedPreset] = useState(products[0]?.image ?? imageOptions[0]?.src ?? "");
  const [filePreview, setFilePreview] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [formState, formAction] = useActionState(saveProduct, initialFormState);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId]
  );
  const selectedCategory = getCategory(categories, selectedCategoryId);

  useEffect(() => {
    if (formState.status !== "success") {
      return;
    }

    router.refresh();

    if (formState.mode === "create") {
      setSelectedProductId(products[0]?.id ?? null);
      setFormMode("create");
      setSelectedCategoryId(categories[0]?.id ?? "");
      setSelectedPreset(imageOptions[0]?.src ?? "");
      setFilePreview("");
      setResetKey((value) => value + 1);
    }
  }, [formState, imageOptions, products, router]);

  useEffect(() => {
    if (!selectedProduct && products.length > 0 && formMode === "edit") {
      setSelectedProductId(products[0].id);
    }

    if (!selectedProduct && products.length === 0) {
      setFormMode("create");
      setSelectedCategoryId(categories[0]?.id ?? "");
      setSelectedPreset(imageOptions[0]?.src ?? "");
    }
  }, [categories, formMode, imageOptions, products, selectedProduct]);

  useEffect(() => {
    if (formMode === "edit" && selectedProduct) {
      setSelectedCategoryId(selectedProduct.categoryId);
      setSelectedPreset(selectedProduct.image);
      setFilePreview("");
    }
  }, [formMode, selectedProduct]);

  const handleCreateIntent = () => {
    setFormMode("create");
    setSelectedProductId(null);
    setSelectedCategoryId(categories[0]?.id ?? "");
    setSelectedPreset(imageOptions[0]?.src ?? "");
    setFilePreview("");
    setResetKey((value) => value + 1);
  };

  const handleEditIntent = (productId) => {
    setFormMode("edit");
    setSelectedProductId(productId);
    setFilePreview("");
    setResetKey((value) => value + 1);
  };

  return (
    <div className="product-manager">
      <div className="product-list-panel">
        <Stack gap="md">
          <div className="category-toolbar">
            <div>
              <h2 className="card-title">Products</h2>
              <p className="body-text">Fast product editing with clean language and pricing structure.</p>
            </div>

            <button className="admin-primary-button" type="button" onClick={handleCreateIntent}>
              Create Product
            </button>
          </div>

          {products.length === 0 ? (
            <div className="category-empty-state">
              <Stack gap="sm">
                <h3 className="card-title">No products yet.</h3>
                <p className="body-text">Create the first product once your categories are in place.</p>
              </Stack>
            </div>
          ) : (
            <div className="product-list">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-row ${selectedProductId === product.id && formMode === "edit" ? "product-row-active" : ""}`}
                >
                  <div className="product-row-media">
                    <img className="product-row-image" src={product.image} alt={product.title.en} />
                  </div>
                  <div className="product-row-main">
                    <div className="product-row-copy">
                      <span className="category-cell-strong">{product.title.en}</span>
                      <span className="category-cell-muted">{product.title.ru}</span>
                      <span className="product-description-preview">{product.description.en}</span>
                    </div>

                    <div className="product-row-meta">
                      <span className="product-price">{formatPrice(product.price)}</span>
                      <span className="product-category-chip">
                        {getCategoryName(categories, product.categoryId)}
                      </span>
                    </div>

                    <div className="category-row-actions product-row-actions">
                      <form action={reorderProduct}>
                        <input type="hidden" name="productId" value={product.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button className="admin-icon-button" type="submit" disabled={index === 0}>
                          Up
                        </button>
                      </form>
                      <form action={reorderProduct}>
                        <input type="hidden" name="productId" value={product.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button
                          className="admin-icon-button"
                          type="submit"
                          disabled={index === products.length - 1}
                        >
                          Down
                        </button>
                      </form>
                      <button
                        className="admin-secondary-button"
                        type="button"
                        onClick={() => handleEditIntent(product.id)}
                      >
                        Edit
                      </button>
                      <form action={removeProduct}>
                        <input type="hidden" name="productId" value={product.id} />
                        <button className="admin-danger-button" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Stack>
      </div>

      <div className="product-form-panel">
        <div className="category-form-surface">
          <Stack gap="lg">
            <div>
              <p className="eyebrow">{formMode === "edit" ? "Edit Product" : "Create Product"}</p>
              <h2 className="card-title">
                {formMode === "edit" ? "Update product details" : "Add a new product"}
              </h2>
            </div>

            <form key={resetKey} action={formAction} className="category-form">
              <input type="hidden" name="mode" value={formMode} />
              <input type="hidden" name="restaurantId" value={restaurantId} />
              <input type="hidden" name="productId" value={selectedProduct?.id ?? ""} />
              <input type="hidden" name="existingImage" value={selectedProduct?.image ?? ""} />

              <Stack gap="md">
                <label className="auth-field">
                  <span className="auth-label">Product name (Russian)</span>
                  <input
                    className={`auth-input ${formState.fieldErrors.titleRu ? "auth-input-error" : ""}`}
                    name="titleRu"
                    type="text"
                    defaultValue={selectedProduct?.title.ru ?? ""}
                    placeholder="Латте с молочной пеной"
                  />
                  {formState.fieldErrors.titleRu ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.titleRu}</span>
                  ) : null}
                </label>

                <label className="auth-field">
                  <span className="auth-label">Product name (English)</span>
                  <input
                    className={`auth-input ${formState.fieldErrors.titleEn ? "auth-input-error" : ""}`}
                    name="titleEn"
                    type="text"
                    defaultValue={selectedProduct?.title.en ?? ""}
                    placeholder="Milk Foam Latte"
                  />
                  {formState.fieldErrors.titleEn ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.titleEn}</span>
                  ) : null}
                </label>

                <label className="auth-field">
                  <span className="auth-label">Category</span>
                  <select
                    className={`auth-input ${formState.fieldErrors.categoryId ? "auth-input-error" : ""}`}
                    name="categoryId"
                    value={selectedCategoryId}
                    onChange={(event) => setSelectedCategoryId(event.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title.ru} / {category.title.en}
                      </option>
                    ))}
                  </select>
                  {formState.fieldErrors.categoryId ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.categoryId}</span>
                  ) : null}
                </label>

                <div className="auth-field">
                  <span className="auth-label">Category (Russian)</span>
                  <input
                    className="auth-input"
                    type="text"
                    value={selectedCategory?.title.ru ?? ""}
                    readOnly
                  />
                </div>

                <div className="auth-field">
                  <span className="auth-label">Category (English)</span>
                  <input
                    className="auth-input"
                    type="text"
                    value={selectedCategory?.title.en ?? ""}
                    readOnly
                  />
                  <Link href="/admin/categories" className="admin-inline-link">
                    Create category
                  </Link>
                </div>

                <label className="auth-field">
                  <span className="auth-label">Description (Russian)</span>
                  <textarea
                    className={`auth-input admin-textarea ${formState.fieldErrors.descriptionRu ? "auth-input-error" : ""}`}
                    name="descriptionRu"
                    defaultValue={selectedProduct?.description.ru ?? ""}
                    placeholder="Нежный эспрессо со взбитым молоком и чистым послевкусием."
                  />
                  {formState.fieldErrors.descriptionRu ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.descriptionRu}</span>
                  ) : null}
                </label>

                <label className="auth-field">
                  <span className="auth-label">Description (English)</span>
                  <textarea
                    className={`auth-input admin-textarea ${formState.fieldErrors.descriptionEn ? "auth-input-error" : ""}`}
                    name="descriptionEn"
                    defaultValue={selectedProduct?.description.en ?? ""}
                    placeholder="Silky espresso with textured milk and a clean finish."
                  />
                  {formState.fieldErrors.descriptionEn ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.descriptionEn}</span>
                  ) : null}
                </label>

                <label className="auth-field">
                  <span className="auth-label">Price</span>
                  <input
                    className={`auth-input ${formState.fieldErrors.price ? "auth-input-error" : ""}`}
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="12.00"
                    defaultValue={selectedProduct?.price ?? ""}
                  />
                  {formState.fieldErrors.price ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.price}</span>
                  ) : null}
                </label>

                <label className="auth-field">
                  <span className="auth-label">Sort order</span>
                  <input
                    className={`auth-input ${formState.fieldErrors.sortOrder ? "auth-input-error" : ""}`}
                    name="sortOrder"
                    type="number"
                    min="1"
                    defaultValue={selectedProduct?.sortOrder ?? products.length + 1}
                  />
                  {formState.fieldErrors.sortOrder ? (
                    <span className="auth-message auth-message-error">
                      {formState.fieldErrors.sortOrder}
                    </span>
                  ) : null}
                </label>

                <div className="auth-field">
                  <span className="auth-label">Image</span>
                  <div className="category-preview-frame">
                    <img
                      className="category-preview-image"
                      src={
                        filePreview ||
                        selectedPreset ||
                        selectedProduct?.image ||
                        imageOptions[0]?.src
                      }
                      alt="Product preview"
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
                              ? selectedProduct?.image === option.src
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

                {formState.message ? (
                  <div
                    className={`auth-alert ${formState.status === "success" ? "auth-alert-success" : ""}`}
                    role="status"
                  >
                    {formState.message}
                  </div>
                ) : null}

                <div className="category-form-actions">
                  <button className="admin-primary-button" type="submit" disabled={categories.length === 0}>
                    {formMode === "edit" ? "Save Changes" : "Create Product"}
                  </button>
                  {formMode === "edit" ? (
                    <button className="admin-secondary-button" type="button" onClick={handleCreateIntent}>
                      New Product
                    </button>
                  ) : null}
                </div>
              </Stack>
            </form>
          </Stack>
        </div>
      </div>
    </div>
  );
}

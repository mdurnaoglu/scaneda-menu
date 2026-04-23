"use client";

import { useEffect, useMemo, useState } from "react";
import { Stack } from "@/components/primitives/stack";

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function getLocalizedText(field, locale) {
  return locale === "ru" ? field.ru : field.en;
}

function getMenuCopy(locale) {
  if (locale === "ru") {
    return {
      categoriesEyebrow: "Категории",
      categoriesTitle: "Выберите категорию",
      categoriesDescription: "Сначала откройте нужный раздел, затем просмотрите позиции.",
      productsEyebrow: "Раздел",
      backLabel: "Все категории",
      emptyLabel: "В этой категории пока нет позиций."
    };
  }

  return {
    categoriesEyebrow: "Categories",
    categoriesTitle: "Choose a category",
    categoriesDescription: "Open a section first, then browse the products inside it.",
    productsEyebrow: "Section",
    backLabel: "All categories",
    emptyLabel: "No products in this category yet."
  };
}

export function MenuShell({ restaurant, locale, categories, products }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    setSelectedCategoryId("");
  }, [categories]);

  const copy = getMenuCopy(locale);
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? null;
  const selectedProducts = useMemo(
    () => products.filter((product) => product.categoryId === selectedCategoryId),
    [products, selectedCategoryId]
  );

  return (
    <div className="public-menu">
      <div className="public-menu-navbar">
        <div className="public-menu-brand">
          <img className="public-menu-brand-logo" src={restaurant.logo} alt={restaurant.name} />
          <div className="public-menu-brand-copy">
            <span className="caption-text">{locale === "ru" ? "Цифровое меню" : "Digital Menu"}</span>
            <strong className="public-menu-brand-name">{restaurant.name}</strong>
          </div>
        </div>
        <span className="public-menu-locale">{locale.toUpperCase()}</span>
      </div>

      {restaurant.coverImage ? (
        <div className="public-cover-hero">
          <img className="public-cover-image" src={restaurant.coverImage} alt={restaurant.name} />
          <div className="public-cover-overlay" />
          <div className="public-cover-center-logo">
            <img src={restaurant.logo} alt={restaurant.name} />
          </div>
        </div>
      ) : null}

      {!selectedCategory ? (
        <section className="menu-category-browser">
          <Stack gap="sm">
            <p className="eyebrow">{copy.categoriesEyebrow}</p>
            <h2 className="card-title menu-browser-title">{copy.categoriesTitle}</h2>
            <p className="body-text">{copy.categoriesDescription}</p>
          </Stack>

          <div className="menu-category-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="menu-category-tile"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                <img
                  className="menu-category-tile-image"
                  src={category.image}
                  alt={getLocalizedText(category.title, locale)}
                />
                <div className="menu-category-tile-overlay" />
                <div className="menu-category-tile-copy">
                  <span className="menu-category-tile-label">
                    {getLocalizedText(category.title, locale)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {selectedCategory ? (
        <section className="menu-category-section">
          <div className="menu-category-section-top">
            <button
              type="button"
              className="menu-back-button"
              onClick={() => setSelectedCategoryId("")}
            >
              ← {copy.backLabel}
            </button>

            <div>
              <p className="eyebrow">{copy.productsEyebrow}</p>
              <h2 className="menu-category-section-title">
                {getLocalizedText(selectedCategory.title, locale)}
              </h2>
            </div>
          </div>

          <div className="menu-category-hero">
            <img
              className="menu-category-image"
              src={selectedCategory.image}
              alt={getLocalizedText(selectedCategory.title, locale)}
            />
            <div className="menu-category-overlay" />
            <div className="menu-category-copy">
              <p className="eyebrow">{copy.productsEyebrow}</p>
              <h2 className="menu-category-title">{getLocalizedText(selectedCategory.title, locale)}</h2>
            </div>
          </div>

          {selectedProducts.length > 0 ? (
            <Stack gap="md">
              {selectedProducts.map((product) => (
                <article key={product.id} className="menu-product-card">
                  <div className="menu-product-media">
                    <img
                      className="menu-product-image"
                      src={product.image}
                      alt={getLocalizedText(product.title, locale)}
                    />
                  </div>

                  <div className="menu-product-body">
                    <div className="menu-product-header">
                      <h3 className="menu-product-title">{getLocalizedText(product.title, locale)}</h3>
                      <span className="menu-product-price">{formatPrice(product.price)}</span>
                    </div>
                    <p className="menu-product-category-name">
                      {getLocalizedText(selectedCategory.title, locale)}
                    </p>
                    <p className="menu-product-description">
                      {getLocalizedText(product.description, locale)}
                    </p>
                  </div>
                </article>
              ))}
            </Stack>
          ) : (
            <div className="menu-empty-state">
              <p className="body-text">{copy.emptyLabel}</p>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

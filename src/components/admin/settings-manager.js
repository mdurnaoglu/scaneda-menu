"use client";

import { useActionState, useMemo, useState } from "react";
import { saveRestaurantSettings } from "@/app/admin/(protected)/settings/actions";
import { Stack } from "@/components/primitives/stack";
import { buildRestaurantThemeStyle } from "@/lib/restaurant-theme";
import { buildPublicUrl } from "@/lib/site-config";

const initialFormState = {
  status: "idle",
  fieldErrors: {},
  message: ""
};

function getSafeColorValue(value, fallback) {
  return /^#([0-9a-f]{6})$/i.test(value) ? value : fallback;
}

function UrlPreviewBlock({ slug }) {
  const routes = useMemo(
    () => [buildPublicUrl(slug, "lang"), buildPublicUrl(slug, "en"), buildPublicUrl(slug, "ru")],
    [slug]
  );

  return (
    <div className="settings-preview-block">
      <Stack gap="sm">
        <p className="caption-text">Public URL Preview</p>
        <h3 className="card-title">Live menu entry points</h3>
        <div className="settings-url-list">
          {routes.map((route) => (
            <p key={route} className="admin-url-preview">
              {route}
            </p>
          ))}
        </div>
      </Stack>
    </div>
  );
}

export function SettingsManager({
  restaurant,
  logoOptions,
  coverOptions
}) {
  const [formState, formAction] = useActionState(saveRestaurantSettings, initialFormState);
  const [draftSlug, setDraftSlug] = useState(restaurant.slug);
  const [selectedLogo, setSelectedLogo] = useState(restaurant.logo || logoOptions[0]?.src || "");
  const [selectedCover, setSelectedCover] = useState(restaurant.coverImage || "");
  const [logoPreview, setLogoPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [primaryColor, setPrimaryColor] = useState(restaurant.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(restaurant.secondaryColor);
  const [themeMode, setThemeMode] = useState(restaurant.themeMode);
  const safePrimaryColor = getSafeColorValue(primaryColor, "#171717");
  const safeSecondaryColor = getSafeColorValue(secondaryColor, "#c8a06a");
  const previewThemeStyle = useMemo(
    () =>
      buildRestaurantThemeStyle({
        ...restaurant,
        primaryColor,
        secondaryColor,
        themeMode
      }),
    [primaryColor, restaurant, secondaryColor, themeMode]
  );

  return (
    <div className="settings-manager">
      <div className="settings-form-panel">
        <div className="category-form-surface">
          <form action={formAction} className="category-form">
            <input type="hidden" name="restaurantId" value={restaurant.id} />
            <input type="hidden" name="previousSlug" value={restaurant.slug} />
            <input type="hidden" name="existingLogo" value={restaurant.logo} />
            <input type="hidden" name="existingCover" value={restaurant.coverImage ?? ""} />

            <Stack gap="lg">
              <div>
                <p className="eyebrow">Restaurant Identity</p>
                <h2 className="card-title">Basic menu presence</h2>
              </div>

              <label className="auth-field">
                <span className="auth-label">Restaurant name</span>
                <input
                  className={`auth-input ${formState.fieldErrors.name ? "auth-input-error" : ""}`}
                  name="name"
                  type="text"
                  defaultValue={restaurant.name}
                  placeholder="Atelier"
                />
                {formState.fieldErrors.name ? (
                  <span className="auth-message auth-message-error">{formState.fieldErrors.name}</span>
                ) : null}
              </label>

              <label className="auth-field">
                <span className="auth-label">Slug</span>
                <input
                  className={`auth-input ${formState.fieldErrors.slug ? "auth-input-error" : ""}`}
                  name="slug"
                  type="text"
                  defaultValue={restaurant.slug}
                  placeholder="atelier"
                  onChange={(event) => setDraftSlug(event.target.value.toLowerCase())}
                />
                {formState.fieldErrors.slug ? (
                  <span className="auth-message auth-message-error">{formState.fieldErrors.slug}</span>
                ) : null}
              </label>

              <div className="auth-field">
                <span className="auth-label">Logo</span>
                <div className="settings-image-preview settings-logo-preview">
                  <img src={logoPreview || selectedLogo || restaurant.logo} alt="Logo preview" />
                </div>
                <div className="settings-image-library">
                  {logoOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`category-image-option ${selectedLogo === option.src && !logoPreview ? "category-image-option-active" : ""}`}
                    >
                      <input
                        className="category-image-radio"
                        type="radio"
                        name="logoPreset"
                        value={option.src}
                        defaultChecked={restaurant.logo === option.src}
                        onChange={() => {
                          setSelectedLogo(option.src);
                          setLogoPreview("");
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
                  name="logoFile"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      setLogoPreview("");
                      return;
                    }

                    setLogoPreview(URL.createObjectURL(file));
                  }}
                />
                <p className="settings-upload-note">Recommended logo size: 512 x 512 px, PNG preferred.</p>
                {formState.fieldErrors.logo ? (
                  <span className="auth-message auth-message-error">{formState.fieldErrors.logo}</span>
                ) : null}
              </div>

              <div className="auth-field">
                <span className="auth-label">Cover image</span>
                <div className="settings-image-preview settings-cover-preview">
                  {coverPreview || selectedCover || restaurant.coverImage ? (
                    <img
                      src={coverPreview || selectedCover || restaurant.coverImage}
                      alt="Cover preview"
                    />
                  ) : (
                    <div className="settings-cover-placeholder">
                      <span className="caption-text">Optional cover image</span>
                    </div>
                  )}
                </div>
                <div className="settings-image-library">
                  {coverOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`category-image-option ${selectedCover === option.src && !coverPreview ? "category-image-option-active" : ""}`}
                    >
                      <input
                        className="category-image-radio"
                        type="radio"
                        name="coverPreset"
                        value={option.src}
                        defaultChecked={restaurant.coverImage === option.src}
                        onChange={() => {
                          setSelectedCover(option.src);
                          setCoverPreview("");
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
                  name="coverFile"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      setCoverPreview("");
                      return;
                    }

                    setCoverPreview(URL.createObjectURL(file));
                  }}
                />
                {formState.fieldErrors.coverImage ? (
                  <span className="auth-message auth-message-error">
                    {formState.fieldErrors.coverImage}
                  </span>
                ) : null}
              </div>

              <div className="auth-field">
                <span className="auth-label">Theme mode</span>
                <div className="settings-status-grid settings-theme-grid">
                  <label className="settings-status-option">
                    <input
                      type="radio"
                      name="themeMode"
                      value="light"
                      checked={themeMode === "light"}
                      onChange={() => setThemeMode("light")}
                    />
                    <div>
                      <span className="settings-status-label">Light</span>
                      <p className="caption-text">Bright and calm presentation for the QR menu.</p>
                    </div>
                  </label>
                  <label className="settings-status-option">
                    <input
                      type="radio"
                      name="themeMode"
                      value="dark"
                      checked={themeMode === "dark"}
                      onChange={() => setThemeMode("dark")}
                    />
                    <div>
                      <span className="settings-status-label">Dark</span>
                      <p className="caption-text">A restrained dark surface for evening-friendly menus.</p>
                    </div>
                  </label>
                </div>
                {formState.fieldErrors.themeMode ? (
                  <span className="auth-message auth-message-error">{formState.fieldErrors.themeMode}</span>
                ) : null}
              </div>

              <div className="settings-brand-grid">
                <label className="auth-field settings-color-field">
                  <span className="auth-label">Primary color</span>
                  <div className="settings-color-input-wrap">
                    <input
                      className="settings-color-picker"
                      name="primaryColor"
                      type="color"
                      value={safePrimaryColor}
                      onChange={(event) => setPrimaryColor(event.target.value.toLowerCase())}
                    />
                    <input
                      className={`auth-input ${formState.fieldErrors.primaryColor ? "auth-input-error" : ""}`}
                      type="text"
                      value={primaryColor}
                      onChange={(event) => setPrimaryColor(event.target.value.toLowerCase())}
                      placeholder="#171717"
                    />
                  </div>
                  {formState.fieldErrors.primaryColor ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.primaryColor}</span>
                  ) : null}
                </label>

                <label className="auth-field settings-color-field">
                  <span className="auth-label">Secondary color</span>
                  <div className="settings-color-input-wrap">
                    <input
                      className="settings-color-picker"
                      name="secondaryColor"
                      type="color"
                      value={safeSecondaryColor}
                      onChange={(event) => setSecondaryColor(event.target.value.toLowerCase())}
                    />
                    <input
                      className={`auth-input ${formState.fieldErrors.secondaryColor ? "auth-input-error" : ""}`}
                      type="text"
                      value={secondaryColor}
                      onChange={(event) => setSecondaryColor(event.target.value.toLowerCase())}
                      placeholder="#c8a06a"
                    />
                  </div>
                  {formState.fieldErrors.secondaryColor ? (
                    <span className="auth-message auth-message-error">{formState.fieldErrors.secondaryColor}</span>
                  ) : null}
                </label>
              </div>

              <div className="auth-field">
                <span className="auth-label">Menu visibility</span>
                <div className="settings-status-grid">
                  <label className="settings-status-option">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      defaultChecked={restaurant.status === "active"}
                    />
                    <div>
                      <span className="settings-status-label">Active</span>
                      <p className="caption-text">Visible for public menu browsing.</p>
                    </div>
                  </label>
                  <label className="settings-status-option">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      defaultChecked={restaurant.status === "inactive"}
                    />
                    <div>
                      <span className="settings-status-label">Inactive</span>
                      <p className="caption-text">Keeps the menu hidden from public visitors.</p>
                    </div>
                  </label>
                </div>
                {formState.fieldErrors.status ? (
                  <span className="auth-message auth-message-error">{formState.fieldErrors.status}</span>
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
                <button className="admin-primary-button" type="submit">
                  Save Settings
                </button>
              </div>
            </Stack>
          </form>
        </div>
      </div>

      <div className="settings-side-panel">
        <Stack gap="md">
          <UrlPreviewBlock slug={draftSlug || restaurant.slug} />

          <div className="settings-preview-block">
            <Stack gap="sm">
              <p className="caption-text">Current State</p>
              <h3 className="card-title">{restaurant.name}</h3>
              <p className="body-text">
                {restaurant.status === "active"
                  ? "Menu is publicly available."
                  : "Menu is currently hidden from public visitors."}
              </p>
            </Stack>
          </div>

          <div className="settings-preview-block">
            <Stack gap="sm">
              <p className="caption-text">Branding Preview</p>
              <div className="settings-brand-preview" style={previewThemeStyle}>
                <div className="settings-brand-preview-bar">
                  <img
                    src={logoPreview || selectedLogo || restaurant.logo}
                    alt={`${restaurant.name} logo`}
                    className="settings-brand-preview-logo"
                  />
                  <span className="settings-brand-preview-mode">{themeMode}</span>
                </div>
                <div className="settings-brand-preview-hero">
                  <p className="eyebrow">QR Menu</p>
                  <h3 className="card-title">{restaurant.name}</h3>
                  <p className="body-text">Brand colors and surface styling will apply on public pages.</p>
                </div>
                <div className="settings-brand-swatches">
                  <span className="settings-brand-swatch">
                    <span
                      className="settings-brand-swatch-chip"
                      style={{ backgroundColor: primaryColor }}
                    />
                    {primaryColor}
                  </span>
                  <span className="settings-brand-swatch">
                    <span
                      className="settings-brand-swatch-chip"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    {secondaryColor}
                  </span>
                </div>
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}

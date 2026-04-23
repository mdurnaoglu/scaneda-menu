function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeHexColor(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    if (trimmed.length === 4) {
      const [, r, g, b] = trimmed;
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }

    return trimmed.toLowerCase();
  }

  return fallback;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex, "#000000").slice(1);
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixColors(left, right, amount) {
  const ratio = clamp(amount, 0, 1);
  const leftRgb = hexToRgb(left);
  const rightRgb = hexToRgb(right);

  return rgbToHex({
    r: leftRgb.r + (rightRgb.r - leftRgb.r) * ratio,
    g: leftRgb.g + (rightRgb.g - leftRgb.g) * ratio,
    b: leftRgb.b + (rightRgb.b - leftRgb.b) * ratio
  });
}

function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function getValidatedRestaurantBranding(restaurant) {
  return {
    primaryColor: normalizeHexColor(restaurant.primaryColor, "#171717"),
    secondaryColor: normalizeHexColor(restaurant.secondaryColor, "#c8a06a"),
    themeMode: restaurant.themeMode === "dark" ? "dark" : "light"
  };
}

export function buildRestaurantThemeStyle(restaurant) {
  const branding = getValidatedRestaurantBranding(restaurant);
  const isDark = branding.themeMode === "dark";
  const headerText = getRelativeLuminance(branding.primaryColor) > 0.45 ? "#111111" : "#ffffff";
  const headerSubtle = headerText === "#111111" ? "rgba(17, 17, 17, 0.72)" : "rgba(255, 255, 255, 0.72)";
  const surface = isDark ? "#101214" : "#ffffff";
  const surfaceStrong = isDark ? "#15181c" : "#ffffff";
  const surfaceMuted = isDark
    ? mixColors("#101214", branding.secondaryColor, 0.1)
    : mixColors("#f7f5f1", branding.secondaryColor, 0.18);
  const line = isDark
    ? withAlpha("#f8fafc", 0.1)
    : withAlpha(branding.primaryColor, 0.08);
  const lineStrong = isDark
    ? withAlpha("#f8fafc", 0.16)
    : withAlpha(branding.primaryColor, 0.14);
  const text = isDark ? "#f5f7fb" : "#171717";
  const textMuted = isDark ? withAlpha("#f5f7fb", 0.74) : "#5f6470";
  const textSubtle = isDark ? withAlpha("#f5f7fb", 0.56) : "#8a909c";
  const stageGradient = isDark
    ? `linear-gradient(180deg, ${withAlpha("#0b0d10", 0.98)} 0%, ${withAlpha("#14171b", 0.96)} 100%)`
    : `linear-gradient(180deg, ${withAlpha("#ffffff", 0.98)} 0%, ${withAlpha("#fcfcfb", 0.94)} 100%)`;
  const accentSoft = isDark
    ? withAlpha(branding.secondaryColor, 0.16)
    : withAlpha(branding.secondaryColor, 0.12);

  return {
    "--public-primary": branding.primaryColor,
    "--public-secondary": branding.secondaryColor,
    "--public-header-bg": branding.primaryColor,
    "--public-header-text": headerText,
    "--public-header-subtle": headerSubtle,
    "--public-surface": surface,
    "--public-surface-strong": surfaceStrong,
    "--public-surface-muted": surfaceMuted,
    "--public-line": line,
    "--public-line-strong": lineStrong,
    "--public-text": text,
    "--public-text-muted": textMuted,
    "--public-text-subtle": textSubtle,
    "--public-stage-gradient": stageGradient,
    "--public-accent-soft": accentSoft
  };
}

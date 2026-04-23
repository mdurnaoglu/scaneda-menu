export const ADMIN_SESSION_COOKIE_NAME = "qr_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "qr-menu-dev-secret";

export interface AdminSession {
  userId: string;
  username: string;
  restaurantId: string;
  expiresAt: number;
}

function toBase64Url(input: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  const bytes = new TextEncoder().encode(input);
  const base64 = btoa(String.fromCharCode(...bytes));

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));

  if (typeof Buffer !== "undefined") {
    return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
  }

  const binary = atob(`${normalized}${padding}`);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

async function signValue(value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(ADMIN_SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  const signatureBytes = new Uint8Array(signatureBuffer);
  const binary = Array.from(signatureBytes, (byte) => String.fromCharCode(byte)).join("");
  const base64 =
    typeof Buffer !== "undefined" ? Buffer.from(signatureBytes).toString("base64") : btoa(binary);

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function createAdminSessionToken(payload: Omit<AdminSession, "expiresAt">) {
  const session: AdminSession = {
    ...payload,
    expiresAt: Date.now() + SESSION_TTL_MS
  };
  const encodedPayload = toBase64Url(JSON.stringify(session));
  const signature = await signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = await signValue(encodedPayload);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const session = JSON.parse(fromBase64Url(encodedPayload)) as AdminSession;

    if (session.expiresAt <= Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

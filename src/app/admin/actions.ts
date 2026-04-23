"use server";

import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByUsername } from "@/data/repositories";
import { verifyPasswordHash } from "@/lib/admin-password";
import { ADMIN_SESSION_COOKIE_NAME, createAdminSessionToken } from "@/lib/admin-session";
import { ADMIN_HOSTS } from "@/lib/site-config";

export interface LoginFormState {
  status: "idle" | "invalid";
  fieldErrors: {
    username?: string;
    password?: string;
  };
  message?: string;
}

export async function loginAdmin(
  _previousState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");

  const fieldErrors: LoginFormState["fieldErrors"] = {};

  if (!username) {
    fieldErrors.username = "Username is required.";
  }

  if (!password) {
    fieldErrors.password = "Password is required.";
  }

  if (fieldErrors.username || fieldErrors.password) {
    return {
      status: "invalid",
      fieldErrors
    };
  }

  const user = getUserByUsername(username);

  if (!user) {
    return {
      status: "invalid",
      fieldErrors: {},
      message: "Invalid username or password."
    };
  }

  const isPasswordValid = await verifyPasswordHash(password, user.passwordHash);

  if (!isPasswordValid) {
    return {
      status: "invalid",
      fieldErrors: {},
      message: "Invalid username or password."
    };
  }

  const token = await createAdminSessionToken({
    userId: user.id,
    username: user.username,
    restaurantId: user.restaurantId
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  redirect(nextPath.startsWith("/admin") || nextPath.startsWith("/") ? nextPath : "/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "";
  const isAdminHost = ADMIN_HOSTS.has(host);

  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
  redirect(isAdminHost ? "/login" : "/admin/login");
}

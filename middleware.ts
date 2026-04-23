import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-session";
import { ADMIN_HOSTS } from "@/lib/site-config";

function isStaticAsset(pathname: string) {
  return pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".");
}

function buildInternalAdminPath(pathname: string, isAdminHost: boolean) {
  if (!isAdminHost || pathname.startsWith("/admin")) {
    return pathname;
  }

  return `/admin${pathname === "/" ? "" : pathname}`;
}

function buildVisibleAdminPath(pathname: string, isAdminHost: boolean) {
  if (!isAdminHost) {
    return pathname;
  }

  if (pathname === "/admin") {
    return "/";
  }

  return pathname.replace(/^\/admin/, "") || "/";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const isAdminHost = ADMIN_HOSTS.has(host);

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const internalPath = buildInternalAdminPath(pathname, isAdminHost);
  const isAdminRoute = internalPath.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = cookieValue ? await verifyAdminSessionToken(cookieValue) : null;
  const loginVisiblePath = isAdminHost ? "/login" : "/admin/login";
  const homeVisiblePath = isAdminHost ? "/" : "/admin";
  const isLoginRoute = internalPath === "/admin/login";

  if (!session && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = loginVisiblePath;
    loginUrl.searchParams.set("next", buildVisibleAdminPath(internalPath, isAdminHost));

    return NextResponse.redirect(loginUrl);
  }

  if (session && isLoginRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = homeVisiblePath;
    redirectUrl.search = "";

    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminHost && pathname !== internalPath) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;

    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};

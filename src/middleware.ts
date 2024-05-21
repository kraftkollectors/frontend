import { NextRequest, NextResponse } from "next/server";
import { debugLog } from "./functions/helpers";
import { appCookies, paths } from "./utils";

export async function middleware(req: NextRequest) {
  debugLog(`middleware-------------${Date.now()}`)
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/dashboard")) {
    const hasAccessToken = req.cookies.has(appCookies.accessToken);
    if (!(hasAccessToken)) return NextResponse.redirect(new URL(paths.login, req.url));
  }
  if (authPaths.map((item)=>pathname.startsWith(item)).includes(true)) {
    const hasAccessToken = req.cookies.has(appCookies.accessToken);
    if (hasAccessToken) return NextResponse.redirect(new URL(paths.dashboard, req.url));
  }
  // if (pathname.startsWith("/admin") && !pathname.startsWith("/admin-")) {
  //   const hasId = req.cookies.has("id");
  //   const hasEmail = req.cookies.has("email");
  //   const hasToken = req.cookies.has("token");
  //   if (!(hasId && hasEmail && hasToken)) {
  //     return NextResponse.redirect(new URL("/admin-login", req.url));
  //   }
  // }
}

const authPaths = [
  paths.login,
  paths.signup,
  paths.forgotPassword,
  paths.resetPassword,
]

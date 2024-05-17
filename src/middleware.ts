import { NextRequest, NextResponse } from "next/server";
import { debugLog } from "./functions/helpers";
import { appCookies } from "./utils";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/dashboard")) {
    debugLog('------------------middleware-------------')
    const hasAccessToken = req.cookies.has(appCookies.accessToken);
    if (!(hasAccessToken)) return NextResponse.redirect(new URL("/login", req.url));
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

import { NextRequest, NextResponse } from "next/server";
import { debugLog } from "./functions/helpers";
import { appCookies, paths } from "./utils";

export async function middleware(req: NextRequest) {
  // debugLog(`middleware-------------${Date.now()}`)
  const pathname = req.nextUrl.pathname;
  const hasAccessToken = req.cookies.has(appCookies.accessToken);
  const hasAccessId = req.cookies.has(appCookies.accessId);
  const _hasAccessToken = req.cookies.has(appCookies.accessToken);
  const _hasAccessId = req.cookies.has(appCookies.adminAccessId);
  if (pathname.includes("api")) {
    return NextResponse.next();
  }else if (pathname.startsWith(paths.dashboard) || pathname.startsWith(paths.becomeASeller+'/')) {
    if (!(hasAccessToken || hasAccessId)) return NextResponse.redirect(new URL(paths.login, req.url));
  }else if (pathname === paths.admin || pathname.startsWith(paths.admin+'/')) {
    if (!(_hasAccessToken || _hasAccessId)) return NextResponse.redirect(new URL(paths.adminLogin, req.url));
  }
  // else if (authPaths.map((item)=>pathname.startsWith(item)).includes(true)) {
    // if (hasAccessToken && hasAccessId) return NextResponse.redirect(new URL(paths.dashboard, req.url));
  // }
}

const authPaths = [
  paths.login,
  paths.signup,
  paths.forgotPassword,
  paths.resetPassword,
]

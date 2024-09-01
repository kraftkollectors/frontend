import { appCookies } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  req.cookies.delete(appCookies.accessId);
  req.cookies.delete(appCookies.accessToken);

  return NextResponse.json({ success: true }, { status: 200 });
}

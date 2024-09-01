import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //   const headers = req.headers;
  //   const ip = headers.get("x-forwarded-for");
  //   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  //   const host = process.env.HOST;
  //   const env = process.env;
  //   return NextResponse.json(
  //     { success: true, ip, apiKey, host, env },
  //     { status: 200 },
  //   );

  return NextResponse.json({ success: false }, { status: 500 });
}

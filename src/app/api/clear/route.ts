import { appCookies } from "@/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    cookies().delete(appCookies.accessId);
    cookies().delete(appCookies.accessToken);

    return NextResponse.json({success: true}, {status: 200});
}


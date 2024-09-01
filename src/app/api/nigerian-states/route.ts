import { NextRequest, NextResponse } from "next/server";
import { NIGERIAN_STATES, TOKENS } from "./data";




export async function GET(req: NextRequest) {
    try{
        const H = req.headers
    const accessToken = H.get('x-access-token');
    if (!TOKENS.includes(accessToken?.toString() ?? '')) return NextResponse.json({
        error: "Invalid access token",
        statusCode: 400
    }, {
        status: 400
    });

    return NextResponse.json({
        success: "Got states successfully",
        statusCode: 200,
        data: NIGERIAN_STATES,
    }, {
        status: 200
    });
    }catch(error:any){
        return NextResponse.json({
            success: "internal server error",
            statusCode: 500,
            data: error.message,
        }, {
            status: 500
        });
    }
}
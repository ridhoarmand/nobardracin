import { safeJson, jsonResponse } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sansekai.my.id/api") + "/reelshort";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return jsonResponse(
        { error: "bookId is required" },
        400
      );
    }

    const response = await fetch(
      `${UPSTREAM_API}/detail?bookId=${encodeURIComponent(bookId)}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return jsonResponse(
        { error: "Failed to fetch detail" },
        response.status
      );
    }

    const data = await safeJson(response);
    return jsonResponse(data);
  } catch (error) {
    console.error("ReelShort Detail Error:", error);
    return jsonResponse(
      { error: "Internal Server Error" },
      500
    );
  }
}


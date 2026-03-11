import { safeJson, jsonResponse } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sansekai.my.id/api") + "/netshort";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const shortPlayId = searchParams.get("shortPlayId");

    if (!shortPlayId) {
      return jsonResponse(
        { success: false, error: "shortPlayId is required" },
        400
      );
    }

    const response = await fetch(`${UPSTREAM_API}/allepisode?shortPlayId=${shortPlayId}`, {
      cache: 'no-store',});

    if (!response.ok) {
      return jsonResponse(
        { success: false, error: "Failed to fetch detail" }
      );
    }

    const data = await safeJson<any>(response);

    // Normalize episode data
    // NetShort provides playClarity which indicates quality (e.g., "720p", "1080p")
    // Each episode has a single playVoucher (video URL), but we normalize it as a videoList for consistency
    const episodes = (data.shortPlayEpisodeInfos || []).map((ep: any) => {
      const videoUrl = ep.playVoucher;
      const quality = ep.playClarity || "720p";
      
      // Create videoList array for consistency with other platforms
      const videoList = [{
        url: videoUrl,
        encode: "H264", // Default encode type
        quality: parseInt(quality) || 720, // Extract number from "720p" etc
        bitrate: "",
        qualityLabel: quality,
      }];

      return {
        episodeId: ep.episodeId,
        episodeNo: ep.episodeNo,
        cover: ep.episodeCover,
        videoUrl, // Keep for backward compatibility
        videoList, // Add for quality selector
        quality,
        isLock: ep.isLock,
        likeNums: ep.likeNums,
        subtitleUrl: ep.subtitleList?.[0]?.url || "",
      };
    });

    return jsonResponse({
      success: true,
      shortPlayId: data.shortPlayId,
      shortPlayLibraryId: data.shortPlayLibraryId,
      title: data.shortPlayName,
      cover: data.shortPlayCover,
      description: data.shotIntroduce,
      labels: data.shortPlayLabels || [],
      totalEpisodes: data.totalEpisode,
      isFinish: data.isFinish === 1,
      payPoint: data.payPoint,
      episodes,
    });
  } catch (error) {
    console.error("NetShort Detail Error:", error);
    return jsonResponse(
      { success: false, error: "Internal server error" }
    );
  }
}



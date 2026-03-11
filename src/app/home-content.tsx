'use client';import dynamic from 'next/dynamic';
import { useLatestDramas, useTrendingDramas, useDubindoDramas } from '@/hooks/useDramas';
import { usePlatform } from '@/hooks/usePlatform';

// Lazy loaded components to reduce initial bundle size
const DramaSection = dynamic(() => import('@/components/DramaSection').then((mod) => mod.DramaSection), { ssr: true });
const ReelShortSection = dynamic(() => import('@/components/ReelShortSection').then((mod) => mod.ReelShortSection), { ssr: true });
const ShortMaxHome = dynamic(() => import('@/components/ShortMaxHome').then((mod) => mod.ShortMaxHome), { ssr: true });
const NetShortHome = dynamic(() => import('@/components/NetShortHome').then((mod) => mod.NetShortHome), { ssr: true });
const MeloloHome = dynamic(() => import('@/components/MeloloHome').then((mod) => mod.MeloloHome), { ssr: true });
const FlickReelsHome = dynamic(() => import('@/components/FlickReelsHome').then((mod) => mod.FlickReelsHome), { ssr: true });
const FreeReelsHome = dynamic(() => import('@/components/FreeReelsHome').then((mod) => mod.FreeReelsHome), { ssr: true });
const InfiniteDramaSection = dynamic(() => import('@/components/InfiniteDramaSection').then((mod) => mod.InfiniteDramaSection), { ssr: true });

export default function HomeContent() {
  const { isDramaBox, isReelShort, isShortMax, isNetShort, isMelolo, isFlickReels, isFreeReels } = usePlatform();

  // Fetch data for all DramaBox sections
  // const { data: popularDramas, isLoading: loadingPopular, error: errorPopular, refetch: refetchPopular } = useForYouDramas(); // REMOVED as requested (replaced by infinite scroll)
  const { data: latestDramas, isLoading: loadingLatest, error: errorLatest, refetch: refetchLatest } = useLatestDramas();
  const { data: trendingDramas, isLoading: loadingTrending, error: errorTrending, refetch: refetchTrending } = useTrendingDramas();
  const { data: dubindoDramas, isLoading: loadingDubindo, error: errorDubindo, refetch: refetchDubindo } = useDubindoDramas();

  return (
    <main className="min-h-screen pt-16">
      {/* DramaBox Content - Multiple Sections */}
      {isDramaBox && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <DramaSection title="Terbaru" dramas={latestDramas} isLoading={loadingLatest} error={!!errorLatest} onRetry={() => refetchLatest()} />
          <DramaSection title="Terpopuler" dramas={trendingDramas} isLoading={loadingTrending} error={!!errorTrending} onRetry={() => refetchTrending()} />
          <DramaSection title="Dubindo" dramas={dubindoDramas} isLoading={loadingDubindo} error={!!errorDubindo} onRetry={() => refetchDubindo()} />

          {/* Infinite Scroll Section */}
          <InfiniteDramaSection title="Lainnya" />
        </div>
      )}

      {/* ReelShort Content - Multiple Sections */}
      {isReelShort && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <ReelShortSection />
        </div>
      )}

      {/* ShortMax Content */}
      {isShortMax && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <ShortMaxHome />
        </div>
      )}

      {/* NetShort Content */}
      {isNetShort && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <NetShortHome />
        </div>
      )}

      {/* Melolo Content */}
      {isMelolo && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <MeloloHome />
        </div>
      )}

      {/* FlickReels Content */}
      {isFlickReels && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <FlickReelsHome />
        </div>
      )}

      {/* FreeReels Content */}
      {isFreeReels && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <FreeReelsHome />
        </div>
      )}
    </main>
  );
}

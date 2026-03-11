'use client';

import { create } from 'zustand';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export type Platform = 'dramabox' | 'reelshort' | 'shortmax' | 'netshort' | 'melolo' | 'flickreels' | 'freereels';

export interface PlatformInfo {
  id: Platform;
  name: string;
  logo: string;
  apiBase: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: 'dramabox',
    name: 'DramaBox',
    logo: '/dramabox.webp',
    apiBase: '/api/dramabox',
  },
  {
    id: 'reelshort',
    name: 'ReelShort',
    logo: '/reelshort.webp',
    apiBase: '/api/reelshort',
  },
  {
    id: 'shortmax',
    name: 'ShortMax',
    logo: '/shortmax.webp',
    apiBase: '/api/shortmax',
  },
  {
    id: 'netshort',
    name: 'NetShort',
    logo: '/netshort.webp',
    apiBase: '/api/netshort',
  },
  {
    id: 'melolo',
    name: 'Melolo',
    logo: '/melolo.webp',
    apiBase: '/api/melolo',
  },
  {
    id: 'flickreels',
    name: 'FlickReels',
    logo: '/flickreels.webp',
    apiBase: '/api/flickreels',
  },
  {
    id: 'freereels',
    name: 'FreeReels',
    logo: '/freereels.webp',
    apiBase: '/api/freereels',
  },
];

interface PlatformState {
  currentPlatform: Platform;
  setPlatform: (platform: Platform) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  currentPlatform: 'dramabox',
  setPlatform: (platform) => set({ currentPlatform: platform }),
}));

export function usePlatform() {
  const { currentPlatform, setPlatform } = usePlatformStore();

  // URL sync hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sync state from URL
  useEffect(() => {
    if (!searchParams) return;
    const platformQuery = searchParams.get('platform');

    if (platformQuery && platformQuery !== currentPlatform) {
      if (PLATFORMS.some((p) => p.id === platformQuery)) {
        setPlatform(platformQuery as Platform);
      }
    }
  }, [searchParams, currentPlatform, setPlatform]);

  // Set platform and sync to URL
  const handleSetPlatform = (platform: Platform) => {
    if (platform === currentPlatform) return;

    setPlatform(platform);

    if (pathname && searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('platform', platform);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const platformInfo = PLATFORMS.find((p) => p.id === currentPlatform)!;

  const getPlatformInfo = (platformId: Platform) => {
    return PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0];
  };

  return {
    currentPlatform,
    platformInfo,
    setPlatform: handleSetPlatform,
    platforms: PLATFORMS,
    getPlatformInfo,
    isDramaBox: currentPlatform === 'dramabox',
    isReelShort: currentPlatform === 'reelshort',
    isShortMax: currentPlatform === 'shortmax',
    isNetShort: currentPlatform === 'netshort',
    isMelolo: currentPlatform === 'melolo',
    isFlickReels: currentPlatform === 'flickreels',
    isFreeReels: currentPlatform === 'freereels',
  };
}

'use client';

import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchDramas } from '@/hooks/useDramas';
import { useReelShortSearch } from '@/hooks/useReelShort';
import { useNetShortSearch } from '@/hooks/useNetShort';
import { useShortMaxSearch } from '@/hooks/useShortMax';
import { useMeloloSearch } from '@/hooks/useMelolo';
import { useFlickReelsSearch } from '@/hooks/useFlickReels';
import { useFreeReelsSearch } from '@/hooks/useFreeReels';
import { usePlatform } from '@/hooks/usePlatform';
import { Suspense, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const normalizedQuery = debouncedQuery.trim();

  // Update searchQuery if URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const { isDramaBox, isReelShort, isShortMax, isNetShort, isMelolo, isFlickReels, isFreeReels, platformInfo, platforms, setPlatform, currentPlatform } = usePlatform();

  const { data: dramaBoxResults, isLoading: isSearchingDramaBox } = useSearchDramas(isDramaBox ? normalizedQuery : '');
  const { data: reelShortResults, isLoading: isSearchingReelShort } = useReelShortSearch(isReelShort ? normalizedQuery : '');
  const { data: netShortResults, isLoading: isSearchingNetShort } = useNetShortSearch(isNetShort ? normalizedQuery : '');
  const { data: shortMaxResults, isLoading: isSearchingShortMax } = useShortMaxSearch(isShortMax ? normalizedQuery : '');
  const { data: meloloResults, isLoading: isSearchingMelolo } = useMeloloSearch(isMelolo ? normalizedQuery : '');
  const { data: flickReelsResults, isLoading: isSearchingFlickReels } = useFlickReelsSearch(isFlickReels ? normalizedQuery : '');
  const { data: freeReelsResults, isLoading: isSearchingFreeReels } = useFreeReelsSearch(isFreeReels ? normalizedQuery : '');

  const isSearching = isDramaBox
    ? isSearchingDramaBox
    : isReelShort
      ? isSearchingReelShort
      : isShortMax
        ? isSearchingShortMax
        : isNetShort
          ? isSearchingNetShort
          : isMelolo
            ? isSearchingMelolo
            : isFlickReels
              ? isSearchingFlickReels
              : isSearchingFreeReels;

  const searchResults = isDramaBox
    ? dramaBoxResults
    : isReelShort
      ? reelShortResults?.data
      : isShortMax
        ? shortMaxResults?.data
        : isNetShort
          ? netShortResults?.data
          : isMelolo
            ? meloloResults?.data?.search_data?.flatMap((item: any) => item.books || []).filter((book: any) => book.thumb_url && book.thumb_url !== '') || []
            : isFlickReels
              ? flickReelsResults?.data
              : freeReelsResults;

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col pt-[100px]">
      <div className="flex items-center gap-4 mb-6 flex-shrink-0 mt-[20px]">
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari drama di ${platformInfo.name}...`}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-4 py-3 pl-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
            autoFocus
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <div className="text-sm font-medium text-muted-foreground">Pilih Platform:</div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
                ${currentPlatform === p.id ? 'bg-red-600/20 text-red-500 ring-1 ring-red-600' : 'bg-zinc-900 hover:bg-zinc-800 text-gray-400'}
              `}
            >
              <img src={p.logo} alt={p.name} className="w-4 h-4 rounded-sm object-cover" />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {isSearching && normalizedQuery && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isDramaBox &&
            searchResults?.map((drama: any, index: number) => (
              <Link
                key={drama.bookId}
                href={`/detail/dramabox/${drama.bookId}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={drama.cover} alt={drama.bookName} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{drama.bookName}</h3>
                  {drama.protagonist && <p className="text-sm text-gray-400 mt-1 truncate">{drama.protagonist}</p>}
                  <p className="text-sm text-gray-500 line-clamp-2 mt-2">{drama.introduction}</p>
                  {drama.tagNames && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {drama.tagNames.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isReelShort &&
            searchResults?.map((book: any, index: number) => (
              <Link
                key={book.book_id}
                href={`/detail/reelshort/${book.book_id}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={book.book_pic} alt={book.book_title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{book.book_title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-2">{book.special_desc}</p>
                  {book.theme && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.theme.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isNetShort &&
            searchResults?.map((drama: any, index: number) => (
              <Link
                key={drama.shortPlayId}
                href={`/detail/netshort/${drama.shortPlayId}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={drama.cover} alt={drama.title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{drama.title}</h3>
                  {drama.description && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{drama.description}</p>}
                  {drama.labels && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {drama.labels.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isShortMax &&
            searchResults?.map((drama: any, index: number) => (
              <Link
                key={`${drama.shortPlayId}-${index}`}
                href={`/detail/shortmax/${drama.shortPlayId}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={drama.cover} alt={drama.title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{drama.title}</h3>
                  {drama.genre && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {drama.genre.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isMelolo &&
            searchResults?.map((book: any, index: number) => (
              <Link
                key={book.book_id}
                href={`/detail/melolo/${book.book_id}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-20 h-28 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden">
                  {book.thumb_url ? (
                    <img
                      src={book.thumb_url.includes('.heic') ? `https://wsrv.nl/?url=${encodeURIComponent(book.thumb_url)}&output=jpg` : book.thumb_url}
                      alt={book.book_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <span className="text-xs text-gray-500">No Img</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{book.book_name}</h3>
                  {book.abstract && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{book.abstract}</p>}
                  {book.stat_infos && book.stat_infos.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">{book.stat_infos[0]}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isFlickReels &&
            searchResults?.map((book: any, index: number) => (
              <Link
                key={book.playlet_id}
                href={`/detail/flickreels/${book.playlet_id}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{book.title}</h3>
                  {book.introduce && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{book.introduce}</p>}
                  {book.tag_list && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.tag_list.slice(0, 3).map((tag: any, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag.tag_name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}

          {isFreeReels &&
            searchResults?.map((book: any, index: number) => (
              <Link
                key={book.key}
                href={`/detail/freereels/${book.key}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-all text-left animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-xl flex-shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white truncate">{book.title}</h3>
                  {book.desc && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{book.desc}</p>}
                  {book.content_tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.content_tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </div>

        {searchResults && searchResults.length === 0 && normalizedQuery && !isSearching && (
          <div className="text-center py-20">
            <p className="text-gray-400">
              Tidak ada hasil untuk "{normalizedQuery}" di {platformInfo.name}
            </p>
          </div>
        )}

        {!normalizedQuery && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
            <p className="text-gray-500 text-lg">Ketik untuk mencari drama di {platformInfo.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}

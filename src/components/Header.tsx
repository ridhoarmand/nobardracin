'use client';import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import Image from 'next/image';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const { currentPlatform, setPlatform, platforms } = usePlatform();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide header on watch pages for immersive video experience
  if (pathname?.startsWith('/watch')) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handlePlatformClick = (platformId: any) => {
    setPlatform(platformId);
    if (pathname !== '/') {
      router.push('/');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg border-b border-white/5' : 'bg-black'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600 hover:text-red-500 transition tracking-tight">NobarDracin</h1>
          </Link>

          <div className="hidden md:flex flex-1 items-center space-x-6 lg:space-x-8 ml-8 overflow-x-auto scrollbar-hide">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformClick(platform.id)}
                className={`flex items-center gap-2 text-sm lg:text-base font-semibold transition-all relative pb-1 whitespace-nowrap ${
                  currentPlatform === platform.id && pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                {platform.name}
                {currentPlatform === platform.id && pathname === '/' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto pl-4">
            <form onSubmit={handleSearch} className="hidden lg:block relative text-gray-400 focus-within:text-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dramas..."
                className="w-56 xl:w-72 bg-black/50 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 focus:bg-zinc-900 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            </form>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-gray-300 hover:text-white transition" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-300 hover:text-white transition ml-1">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-900 absolute top-20 left-0 right-0 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1 pb-20">
            <form onSubmit={handleSearch} className="mb-4 relative lg:hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dramas..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-2">Platforms</div>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformClick(platform.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                  currentPlatform === platform.id && pathname === '/' ? 'bg-red-600/10 text-red-500' : 'text-gray-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

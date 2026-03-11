# NobarDracin

NobarDracin adalah platform streaming drama pendek (vertical drama) modern yang menampilkan konten dari beberapa platform populer. Dibangun dengan teknologi web terkini untuk performa maksimal dan pengalaman pengguna yang premium.

## Fitur

- 🎬 **Multi-Platform Support** - Streaming dari DramaBox, ReelShort, ShortMax, NetShort, Melolo, FlickReels, dan FreeReels
- 🎨 **Modern UI/UX** - Desain clean dengan tema Netflix red
- 📱 **Responsive** - Tampilan optimal untuk desktop dan mobile
- 🔍 **Pencarian** - Cari drama favoritmu dengan mudah
- 🎯 **Platform Icons** - Icon khusus untuk setiap platform memudahkan identifikasi
- ⚡ **Performant** - Dibangun dengan Next.js untuk performa maksimal
- 🚀 **Optimized** - Font self-hosted, bundle ringan, caching optimal

## Optimasi Performa

Website ini sudah dioptimalkan untuk performa maksimal:

### ✅ Yang Sudah Dilakukan
- **Hapus Enkripsi** - Removed unnecessary encryption overhead untuk response lebih cepat
- **Font Optimization** - Menggunakan `next/font` untuk self-hosted fonts (lebih cepat, no FOUC)
- **Image Optimization** - AVIF + WebP formats, proper sizing
- **Bundle Size** - Menghapus 36+ unused UI components dan dependencies
- **Dependencies Cleanup** - Removed 48+ packages yang tidak digunakan
- **Production Compiler** - Auto-remove `console.log` di production
- **React Strict Mode** - Enabled untuk better code quality
- **Smart Caching** - 5 minute stale time untuk data yang jarang berubah

### 📊 Hasil Optimasi
- **Dependencies**: 454 packages (dari ~500+)
- **UI Components**: 13 files (dari 49 files)
- **Build Time**: ~4.6s dengan Turbopack
- **Bundle Size**: Significantly reduced

### 🔮 Potensi Optimasi Lanjutan
- Upgrade ke React 19 untuk performa lebih baik
- Migrate ke Tailwind CSS v4 (3-5x lebih cepat)
- Implementasi Redis caching untuk API responses
- Lazy loading untuk video player components
- Bundle analysis dengan `@next/bundle-analyzer`

## Platform yang Didukung

| Platform   | Deskripsi                                     |
| ---------- | --------------------------------------------- |
| DramaBox   | Drama pendek populer dengan berbagai genre    |
| ReelShort  | Koleksi drama pendek berkualitas              |
| ShortMax   | Streaming drama pendek gratis                 |
| NetShort   | Platform drama pendek dengan konten eksklusif |
| Melolo     | Drama pendek dengan subtitle Indonesia        |
| FlickReels | Koleksi drama pendek terbaru                  |
| FreeReels  | Drama pendek gratis tanpa iklan               |

## Persyaratan Sistem
Sebelum memulai, pastikan komputer Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (Versi 18 LTS atau 20 LTS disarankan)
- Git (Opsional)

## Panduan Instalasi (Localhost)

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer Anda:

### 1. Clone Repository
1.  Buka terminal (Command Prompt/PowerShell).
2.  Clone repository ini ke komputer Anda:
    ```bash
    git clone https://github.com/ridhoarmand/nobardracin.git
    ```
3.  Masuk ke folder project:
    ```bash
    cd nobardracin
    ```

### 2. Install Dependencies
Install semua library yang dibutuhkan project ini:
```bash
npm install
# atau jika menggunakan yarn
yarn install
# atau pnpm
pnpm install
```

### 3. Konfigurasi Environment Variable
Salin file bernama `.env.example` menjadi `.env`

### 4. Jalankan Development Server
Mulai server lokal untuk pengembangan:
```bash
npm run dev
```

Buka browser dan kunjungi [http://localhost:3000](http://localhost:3000).

## Script Perintah
| Command         | Fungsi                           |
| --------------- | -------------------------------- |
| `npm run dev`   | Menjalankan server development   |
| `npm run build` | Membuat build production         |
| `npm run start` | Menjalankan build production     |
| `npm run lint`  | Cek error coding style (Linting) |

## Struktur Folder
```text
src/
├── app/                    # Halaman & Routing (Next.js App Router)
│   ├── (auth)/             # Route Group untuk fitur Login/Register
│   ├── (main)/             # Route Group untuk konten utama (Home, Search)
│   ├── api/                # API Routes untuk integrasi backend
│   ├── drama/              # Halaman detail & Video player
│   └── layout.tsx          # Root layout aplikasi
├── components/             # Reusable UI Components
│   ├── ui/                 # Base components (Shadcn UI)
│   ├── player/             # Komponen khusus video player
│   ├── cards/              # Komponen card drama/koleksi
│   └── layouts/            # Navbar, Sidebar, Footer
├── hooks/                  # Custom React Hooks (useAuth, usePlayer, dll)
├── lib/                    # Helper functions & konfigurasi library (Prisma, Axios)
├── services/               # Logic fetching data & business logic
├── types/                  # TypeScript interfaces & types definitions
└── styles/                 # Global CSS & Tailwind configuration
```

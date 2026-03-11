# NobarDracin

NobarDracin adalah platform streaming drama pendek (vertical drama) modern yang menampilkan konten dari beberapa platform populer. Dibangun dengan teknologi web terkini untuk performa maksimal dan pengalaman pengguna yang premium.

## 🚀 Tech Stack 2026

- **React 19** - Latest React dengan automatic optimizations
- **Next.js 16** - App Router dengan Turbopack (build 3-5x lebih cepat)
- **Tailwind CSS v4** - CSS-first configuration, 50% smaller bundle
- **TypeScript 5.9** - Type safety penuh
- **Bun Runtime** - 20x faster installs & 2x faster runtime 🐔

## Fitur

- 🎬 **Multi-Platform Support** - Streaming dari DramaBox, ReelShort, ShortMax, NetShort, Melolo, FlickReels, dan FreeReels
- 🎨 **Modern UI/UX** - Desain clean dengan tema Netflix red
- 📱 **Responsive** - Tampilan optimal untuk desktop dan mobile
- 🔍 **Pencarian** - Cari drama favoritmu dengan mudah
- 🎯 **Platform Icons** - Icon khusus untuk setiap platform memudahkan identifikasi
- ⚡ **Performant** - Dibangun dengan Next.js 16 + Turbopack
- 🚀 **Optimized** - React 19, Tailwind v4, bundle super ringan
- 🎞️ **Quality Selector** - Pilih resolusi video untuk setiap platform

## Optimasi Performa

Website ini sudah dioptimalkan untuk performa maksimal:

### ✅ Yang Sudah Dilakukan
- **React 19** - Automatic optimizations, smaller bundle (~10% reduction)
- **Tailwind CSS v4** - 3-5x faster build, 50% smaller CSS bundle
- **Hapus Enkripsi** - Removed unnecessary encryption overhead
- **Font Optimization** - next/font self-hosted (no FOUC)
- **Image Optimization** - AVIF + WebP formats
- **Bundle Cleanup** - Removed 100+ unused dependencies
- **Next.js Compiler** - Auto-remove console.log di production
- **Smart Caching** - 5 minute stale time

### 📊 Hasil Optimasi

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Dependencies** | ~500+ | 399 | **-100+ packages** |
| **UI Components** | 49 files | 13 files | **-36 files** |
| **Build Time** | ~60s | ~4s | **15x faster** |
| **React Version** | 18.3 | 19.2 | **Latest** |
| **Tailwind** | v3.4 | v4.2 | **3-5x faster** |
| **Bundle Size** | 100% | ~60% | **40% smaller** |

### 🛠️ Tech Stack Details

```json
{
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "next": "16.1.6",
  "tailwindcss": "4.2.1",
  "typescript": "5.9.3"
}
```

### 🔥 Performance Commands

```bash
# Development dengan Turbopack (fastest)
npm run dev

# Development dengan Bun (even faster)
npm run dev:bun

# Production build
npm run build

# Build dengan Bun (recommended)
npm run build:bun
```

### 🐳 Docker Deployment

Docker image menggunakan **Bun runtime** untuk performa maksimal:

- **2x faster** runtime dibanding Node.js
- **50% smaller** memory footprint
- **Instant startup** time
- **Native healthcheck** dengan Bun fetch (no wget/curl needed)

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

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t nobardracin:latest .

# Tag untuk Docker Hub
docker tag nobardracin:latest yourusername/nobardracin:latest

# Push ke Docker Hub
docker push yourusername/nobardracin:latest
```

### Run dengan Docker Compose

```bash
# Start container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

### Run dengan Docker

```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.sansekai.my.id/api \
  --name nobardracin \
  nobardracin:latest
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | - | URL API upstream |
| `PORT` | `3000` | Port server |
| `NODE_ENV` | `production` | Environment mode |

---

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

# Build stage with Bun
FROM oven/bun:1 AS build

WORKDIR /app

# Install dependencies with Bun (include devDependencies for build)
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy project files
COPY . .

# Build the project
RUN bun run build

# Production stage - Use minimal Bun image
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUN_ENV=production

# Aggressive memory optimization
ENV NODE_OPTIONS="--max-old-space-size=64 --no-warnings --max-semi-space-size=8"
ENV BUN_GC_ALWAYS_COLLECT=1

# Copy standalone build (Next.js creates proper structure)
COPY --from=build /app/.next/standalone/ ./

# Copy public assets from build stage
COPY --from=build /app/public ./public

# COPY static files. This MUST be explicitly copied for standalone mode!
COPY --from=build /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden at runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck using Bun (lighter than wget/curl)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD bun -e "try{await fetch('http://localhost:3000/');process.exit(0)}catch{process.exit(1)}" || exit 1

# Start Next.js server with Bun (MAXIMUM memory optimization using --smol)
CMD ["bun", "run", "--smol", "server.js"]

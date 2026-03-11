# Build stage with Bun
FROM oven/bun:1 AS build

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies (include devDependencies for build)
RUN bun install --frozen-lockfile

# Copy all project files
COPY . .

# Build Next.js - creates .next folder with all static assets
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

# Copy the entire .next folder (includes static, server, and all assets)
COPY --from=build /app/.next ./.next

# Copy public assets
COPY --from=build /app/public ./public

# Copy package files for node_modules (if needed)
COPY --from=build /app/package.json ./package.json

# Install only production dependencies in runner
RUN bun install --production --frozen-lockfile 2>/dev/null || true

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden at runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck using Bun (lighter than wget/curl)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD bun -e "try{await fetch('http://localhost:3000/');process.exit(0)}catch{process.exit(1)}" || exit 1

# Start Next.js server with Bun
CMD ["bun", "run", "next", "start"]

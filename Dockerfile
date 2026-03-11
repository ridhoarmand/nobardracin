# Build stage with Bun
FROM oven/bun:1 AS build

WORKDIR /app

# Install dependencies with Bun
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

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
ENV BUN_FEATURE_FLAGS="--minimize-memory"

# Copy ONLY the standalone output (minimal files)
COPY --from=build /app/.next/standalone/server.js ./
COPY --from=build /app/.next/standalone/.next/static ./.next/static
COPY --from=build /app/.next/standalone/.next/server ./.next/server
COPY --from=build /app/.next/standalone/.env* ./
COPY --from=build /app/.next/standalone/package.json ./

# Copy public assets separately (icons, etc.)
COPY --from=build /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden at runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck using Bun (lighter than wget/curl)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD bun -e "try{await fetch('http://localhost:3000/');process.exit(0)}catch{process.exit(1)}" || exit 1

# Start Next.js server with Bun (MAXIMUM memory optimization)
CMD ["bun", "run", "--minimize-memory", "--no-warnings", "--gc-always-collect", "server.js"]

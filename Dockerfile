# Build stage with Bun
FROM oven/bun:1 AS build

WORKDIR /app

# Install dependencies with Bun
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy project files
COPY . .

# Build the project
RUN bun run build

# Production stage
FROM oven/bun:1 AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 bunjs

# Copy necessary files from build stage
# For Next.js 16 with App Router, we need the standalone output
COPY --from=build --chown=bunjs:bunjs /app/.next/standalone ./
COPY --from=build --chown=bunjs:bunjs /app/.next/static ./.next/static
COPY --from=build --chown=bunjs:bunjs /app/public ./public

# Switch to non-root user
USER bunjs

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden at runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start Next.js server with Bun
CMD ["bun", "run", "server.js"]

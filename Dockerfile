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

# Copy necessary files from build stage
# For Next.js 16 with App Router, we need the standalone output
COPY --from=build --chown=1000:1000 /app/.next/standalone ./
COPY --from=build --chown=1000:1000 /app/.next/static ./.next/static
COPY --from=build --chown=1000:1000 /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variables (can be overridden at runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck using Bun (lighter than wget/curl)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD bun -e "try{await fetch('http://localhost:3000/');process.exit(0)}catch{process.exit(1)}" || exit 1

# Start Next.js server with Bun
CMD ["bun", "run", "server.js"]

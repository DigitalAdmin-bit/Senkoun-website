# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Copy source code
COPY . .

# Build Strapi
RUN npm run build

# Stage 2: Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Create app user for security
RUN addgroup -g 1001 -S nodejs && adduser -S strapi -u 1001

# Copy node_modules and built app from builder
COPY --from=builder --chown=strapi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:nodejs /app/dist ./dist
COPY --from=builder --chown=strapi:nodejs /app/public ./public
COPY --from=builder --chown=strapi:nodejs /app/config ./config
COPY --from=builder --chown=strapi:nodejs /app/src ./src
COPY --from=builder --chown=strapi:nodejs /app/package.json ./package.json

# Create necessary directories with proper permissions
RUN mkdir -p /app/data /app/.cache && chown -R strapi:nodejs /app

# Switch to non-root user
USER strapi

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/admin', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 1337

# Use dumb-init to properly handle signals
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start Strapi
CMD ["npm", "start"]


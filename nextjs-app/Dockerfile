# Stage 1: Install production dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 2: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 3: Production runner using standalone output
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone server bundle
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public assets
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

# Stage 0: Pull Lambda Web Adapter
FROM --platform=linux/amd64 public.ecr.aws/awsguru/aws-lambda-adapter:1.0.0 AS adapter

# Stage 1: Install production dependencies
FROM --platform=linux/amd64 node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 2: Build the Next.js application
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 3: Production runner using standalone output
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

# Copy Lambda Web Adapter
COPY --from=adapter /lambda-adapter /opt/extensions/lambda-adapter

ENV NODE_ENV=production
ENV PORT=3000
ENV AWS_LWA_PORT=3000

# Copy the standalone server bundle
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public assets
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

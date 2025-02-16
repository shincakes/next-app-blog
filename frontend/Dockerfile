# Stage 1: Build Next.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# ✅ Build Next.js app
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine AS runner

WORKDIR /app

# ✅ Copy the built `.next` directory from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

# Expose Next.js default port
EXPOSE 3000

# ✅ Start Next.js in production mode
CMD ["npm", "start"]

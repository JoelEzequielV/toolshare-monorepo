
FROM node:20-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget --quiet --tries=1 --spider http://127.0.0.1:3001/health || exit 1

CMD ["node", "dist/main.js"]

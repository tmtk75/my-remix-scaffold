FROM node:20-alpine

COPY package.json pnpm-lock.yaml* tsconfig.json vite.config.ts ./
COPY prisma ./prisma
COPY public ./public
COPY app ./app

RUN corepack enable pnpm && pnpm install
RUN pnpm run build

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV "production"

CMD ["pnpm", "run", "start"]

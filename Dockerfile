FROM node:22.6.0-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"

RUN corepack enable

USER node

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node nuxt.config.ts ./
COPY --chown=node:node app ./app
COPY --chown=node:node config ./config
COPY --chown=node:node modules ./modules
COPY --chown=node:node server ./server
COPY --chown=node:node public ./public
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node tsconfig.json ./

RUN pnpm install

RUN npm run build

RUN pnpm prune --prod

FROM node:22.6.0-alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"

RUN corepack enable

USER node

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/.output ./.output
COPY --from=build /app/public ./public
COPY --from=build /app/server ./server

EXPOSE 3000

CMD ["pnpm", "start"]
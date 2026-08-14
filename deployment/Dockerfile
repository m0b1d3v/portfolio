# Stage 0
# Copying necessary files and installing NPM packages
FROM node:24.19.0-alpine AS base

WORKDIR /app
COPY development/ ./
RUN npm install
RUN npm run build

# Stage 1
# Development spot-checking
FROM base AS development

EXPOSE 8080
CMD npm start

# Stage 2
# Playwright testing
# https://playwright.dev/docs/docker#pull-the-image
FROM mcr.microsoft.com/playwright:v1.62.0-noble AS testing

COPY --from=base /app ./
CMD npm test

# Stage 3
# Production run
FROM caddy:2.11.4-alpine AS production

VOLUME /data
ENV XDG_CONFIG_HOME /data/config
COPY --from=base /app/_site /srv
COPY deployment/Caddyfile /etc/caddy/Caddyfile

# Stage 0
# Copying necessary files and installing NPM packages
FROM node:20.13.1-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY .eleventy.js ./
COPY site ./site
RUN npm run build

# Stage 1
# Development spot-checking
FROM base as dev

EXPOSE 8080
CMD npm start

# Stage 2
# Playwright testing
# https://playwright.dev/docs/docker#pull-the-image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy as test

COPY --from=base /app ./
COPY playwright.config.ts ./
COPY tests ./tests
CMD npm test

# Stage 3
# Production run
FROM caddy:2.7.6-alpine as production

VOLUME /data
ENV XDG_CONFIG_HOME /data/config
COPY --from=base /app/_site /srv
COPY Caddyfile /etc/caddy/Caddyfile

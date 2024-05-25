# Stage 0
# Copying necessary files and installing NPM packages
FROM node:20.13.1-alpine AS base

WORKDIR /app
COPY development/ ./
RUN npm install
RUN npm run build

# Stage 1
# Development spot-checking
FROM base as development

EXPOSE 8080
CMD npm start

# Stage 2
# Playwright testing
# https://playwright.dev/docs/docker#pull-the-image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy as testing

COPY --from=base /app ./
CMD npm test

# Stage 3
# Production run
FROM caddy:2.7.6-alpine as production

VOLUME /data
ENV XDG_CONFIG_HOME /data/config
COPY --from=base /app/_site /srv
COPY deployment/Caddyfile /etc/caddy/Caddyfile

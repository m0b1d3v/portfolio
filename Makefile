all:
	cat Makefile

start:
	caddy run --config ./Caddyfile --watch

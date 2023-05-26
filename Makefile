all:
	cat Makefile

# Development

start:
	caddy run --config ./Caddyfile --watch

images:
	find public/images -type f \( -name "*.png" -o -name "*jpg" \) | parallel cwebp -q 100 -lossless -resize 640 0 -short "{}" -o "{}.webp"

# E2E testing

e2e-snapshots:
	npx playwright test --update-snapshots --grep render

e2e-visual:
	npx playwright test --grep render --project=firefox

e2e-content:
	npx playwright test --grep-invert render --project=firefox

e2e-ui:
	npx playwright test --ui

e2e:
	npx playwright test

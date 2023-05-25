all:
	cat Makefile

start:
	caddy run --config ./Caddyfile --watch

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

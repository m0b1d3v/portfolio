all:
	cat Makefile

deploy:
	fly deploy --local-only --config deployment/fly.toml --dockerfile deployment/Dockerfile

logs:
	fly logs -a m0b1d3v

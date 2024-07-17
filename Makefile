read = cat --number

ifeq ($(OS),Windows_NT)
	# Overwrite default Linux tasks for Windows users
	read = type
endif

all:
	$(read) Makefile

deploy:
	fly deploy \
		--local-only \
		--config deployment/fly.toml \
		--dockerfile deployment/Dockerfile \
		--ignorefile .dockerignore

logs:
	fly logs -a m0b1d3v

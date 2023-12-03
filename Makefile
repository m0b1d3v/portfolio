all:
	cat Makefile

clean:
	npm run clean

build:
	npm run build

check:
	make deploy flags="--dry-run"

deploy:
	rsync \
		--archive \
		--chmod=D775,F664 \
		--chown=:caddy \
		--compress \
		--delete \
		--itemize-changes \
		--omit-dir-times \
		--verbose \
		$(flags) \
		_site/ projects:/srv/portfolio/public/

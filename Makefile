all:
	cat Makefile

buildToolUpdate:
	./gradlew wrapper --gradle-version latest

run:
	caddy run --config ./Caddyfile --watch

images:
	find src/main/webapp/images -type f \( -name "*.png" -o -name "*jpg" \) ! -exec test -f "{}.webp" \; -print | \
		parallel cwebp -q 100 -lossless -resize 640 0 -short "{}" -o "{}.webp"

test:
	./gradlew test

owasp:
	./gradlew dependencyCheckAnalyze

updates:
	./gradlew dependencyUpdates

transfer-check:
	make transfer flags="--dry-run"

transfer:
	rsync \
		--archive \
		--chmod=D775,F664 \
		--chown=:caddy \
		--compress \
		--delete \
		--exclude 'images/**/*.jpg' \
		--exclude 'images/**/*.png' \
		--itemize-changes \
		--omit-dir-times \
		--verbose \
		$(flags) \
		src/main/webapp/ projects:/srv/portfolio/public/

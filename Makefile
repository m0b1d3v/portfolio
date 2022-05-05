# Project identifier
project = portfolio

# Command line variable building with check for a project flag specified
build = /srv/$(project)

# When this Makefile run was called
date = $(shell date +%s)

# Directory for public assets to be placed in for a given build
public = $(build)/public

# Transparently calls other make targets without cluttering up the console
subTask = @make --no-print-directory

# Clean build directory to prepare for new files
clean:
	rm -rf $(public)/*

# Start a development session with auto-updates
develop: clean
	$(subTask) project=$(project) clientFlags="server" client

# Start a client development session
client:
	hugo --destination $(public) --noTimes $(clientFlags)

# Make sure an environment was supplied on the command line
check-environment:
	$(if $(environment),, $(error Provide environment 'primary' or 'secondary'))

# Create a build for release
build: check-environment clean
	$(subTask) clientFlags="--environment $(environment)" client

# Dry-run of transferring build to remote servers
transfer-check:
	$(subTask) flags="n" transfer

# Transfer builds to remote servers
transfer: check-environment
	rsync -aivzO$(flags) --delete --exclude 'analytics.html' --chmod=D775,F664 --chown=:$(project) $(public)/ $(environment):$(build)/public/

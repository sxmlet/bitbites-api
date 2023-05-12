.PHONY: build publish-images

BITES_AUTH_API=bites-auth-api

run: build
	@docker-compose up -d

build:
	@docker-compose build

publish-images:
	@${REPO:? Repository must be specified}
	@docker push ${REPO}/${BITES_AUTH_API}

.PHONY: build publish-images

run: build
	@docker-compose up -d

build:
	@${TAG:? Tag required}
	@docker-compose build

publish-images:
	@${REPO:? Repository must be specified}
	@docker push ${REPO}/bitbites-api

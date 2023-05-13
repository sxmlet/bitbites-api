# bitBites bites API

One of the main microserices that provides the storage and retrieval of user created bites.

## Getting started

### Prerequisites

The following environment variables need to be configured:
* POSTGRES_PASSWORD
* POSTGRES_USER
* POSTGRES_DB
* POSTGRES_HOST
* POSTGRES_PORT


* REGION - The region of the bucket
* BUCKET - The bucket where images will be stored
* PORT - The port where the application is listening to
* BITBITES_ACCESS_KEY_ID - AWS access key
* BITBITES_SECRET_ACCESS_KEY - AWS secret key
* BITBITES_SESSION_TOKEN - AWS session token

After successful configuration run the following command to start the development server:
```shell
npm run dev
```

### Docker

To run the dockerized version of the application check [bitbites-infra](https://github.com/sxmlet/bitbites-infra).
The docker network is external therefore it needs to be created first. Use the provided `make` command from the infra
repository.

The included `docker-compose.yaml` contains a postresql service for local development.
```shell
docker-comose up -d postgres
```
The service is available at `http://localhost:55432`.

## Deployment & CI/CD

Circle CI takes care of the automated build process. A new image is getting pushed on every tag. The git tag will be
used for the image tag as well. As part of the deployment process, the new image gets released into production.

To build docker image locally:
```shell
TAG=mytag make build
```
To push docker images:
```shell
TAG=mytag REPO=myrepo make push
```

## Used sources

* Udacity cloud dev courses
* https://expressjs.com/

## Glossary

* Bite(s): a single post, created by a user

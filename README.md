# TASK MANAGEMENT API

## Prerequisites

```
- Node.js
- yarn || npm || pnpm
- docker
```

## Installation

```
$ yarn
```

## Running the application

```
$ touch .env.stage.dev && mv .env.example .env.stage.dev
$ docker run --name docker_name -p 5432:5432 -e POSTGRES_PASSWORD=db_password -d postgres

# development
$ yarn start

# development watch mode
$ yarn start:dev

# production
$ yarn start:prod
```

## Running test

```
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Author

[@dushimeemma](hhttps://github.com/dushimeemma)

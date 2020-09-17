# nest-typeorm

Backend sample implementation for PostgreSQL.

- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [TypeScript](https://www.typescriptlang.org/)
- [node-postgres](https://node-postgres.com/)

## Installation

```bash
$ yarn install
```

## Initial Settings

1. Check `src/app.module.ts`.  
   Edit following attributes.
   - host: {your database host or 127.0.0.1}
   - port: {your database port}
   - username: '{your username}'
   - password: '{your password}'
1. Create database 'nest_typeorm'.
1. Execute migration.
   ```bash
   $ yarn migration:generate
   $ yarn migration:run
   ```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Usage

Request to `http://localhost:80/{APIs}`.  
Use ex:
[Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo/details).

## APIs

Check `src/test-objects/test-objets.controller.ts`.

# Detail Pro Mobile API

Backend API for the Detail Pro mobile app. The service handles user registration and authentication, JWT tokens, user profile operations, and detailing orders.

The displayed API version is resolved from `API_VERSION`, then from `package.json`. Current package version: `0.0.1`.

## Features

- User registration and login by phone number.
- `accessToken` and `refreshToken` issuing.
- Access token refresh through a refresh token.
- User profile retrieval and update.
- Detailing order creation, retrieval, and update.
- Admin-only user deletion.
- Swagger UI with Bearer JWT authorization.

## Tech Stack

- Node.js + TypeScript
- NestJS 11
- PostgreSQL
- Sequelize + sequelize-typescript
- Passport JWT
- Swagger/OpenAPI
- Docker Compose for the local database

## Requirements

- Node.js 22+
- npm
- Docker and Docker Compose
- PostgreSQL, if the database is not started through Docker

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
API_VERSION=0.0.1

DB_HOST=localhost
DB_PORT=5436
DB_USER=nest_user
DB_PASSWORD=nest_password
DB_NAME=nest_db

PRIVATE_KEY=replace_with_access_token_secret
REFRESH_PRIVATE_KEY=replace_with_refresh_token_secret
```

Variable reference:

| Variable              | Purpose                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `PORT`                | HTTP server port. Defaults to `3000`.                            |
| `API_VERSION`         | Version displayed in Swagger.                                    |
| `DB_HOST`             | PostgreSQL host.                                                 |
| `DB_PORT`             | PostgreSQL port. `docker-compose.yml` exposes local port `5436`. |
| `DB_USER`             | PostgreSQL user.                                                 |
| `DB_PASSWORD`         | PostgreSQL user password.                                        |
| `DB_NAME`             | PostgreSQL database name.                                        |
| `PRIVATE_KEY`         | Secret used to sign access tokens.                               |
| `REFRESH_PRIVATE_KEY` | Secret used to sign refresh tokens.                              |

## Installation

```bash
npm install
```

## Start Database

## Run with Docker

You can run the backend API and PostgreSQL database using Docker Compose.

### Start the Application

Build the Docker image and start all services:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f app
```

Open the API:

- **API:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:3000/api`

If you configure a different application port, use that port instead.

### Stop the Application

Stop and remove the containers:

```bash
docker compose down
```

To stop the services without removing the containers:

```bash
docker compose stop
```

### Rebuild the Application

After changing the source code or Docker configuration, rebuild and restart the services:

```bash
docker compose up -d --build
```

### Database Persistence

To stop the services without deleting the database volume, use:

```bash
docker compose down
```

To remove the containers and database volumes, use:

```bash
docker compose down -v
```

**Warning:** The `-v` option deletes the associated Docker volumes and may permanently remove stored database data.

```bash
docker compose up -d
```

Docker starts PostgreSQL 15 with these defaults:

- database: `nest_db`
- user: `nest_user`
- password: `nest_password`
- local port: `5436`

## Start Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production build + start
npm run build
npm run start:prod
```

After startup, the API is available at:

```text
http://localhost:3000
```

If `.env` contains a different `PORT`, use that port instead of `3000`.

## Swagger

Swagger UI is available at:

```text
http://localhost:3000/api
```

For protected endpoints, click `Authorize` and pass the access token in this format:

```text
Bearer <accessToken>
```

`accessToken` and `refreshToken` are returned by `POST /auth/login` and `POST /auth/registration`.

## Auth Flow

1. Register a user through `POST /auth/registration` or log in through `POST /auth/login`.
2. Store `accessToken` and `refreshToken` on the client.
3. Send `accessToken` in the `Authorization` header for protected endpoints.
4. When the access token expires, send `refreshToken` to `POST /auth/refresh`.

Current token lifetimes in code:

- access token: `1m`
- refresh token: `1d`

## Main Endpoints

| Method   | Path                     | Auth       | Description                                               |
| -------- | ------------------------ | ---------- | --------------------------------------------------------- |
| `GET`    | `/`                      | No         | API availability check.                                   |
| `POST`   | `/auth/registration`     | No         | Register a user and issue tokens.                         |
| `POST`   | `/auth/login`            | No         | Log in a user and issue tokens.                           |
| `POST`   | `/auth/refresh`          | No         | Refresh a token pair by refresh token.                    |
| `GET`    | `/order`                 | Bearer JWT | Get the authenticated user's orders.                      |
| `POST`   | `/order/create-order`    | Bearer JWT | Create an order. `phone` and `user_id` come from the JWT. |
| `GET`    | `/order/:id`             | No         | Get an order by ID.                                       |
| `PATCH`  | `/order/:id`             | Bearer JWT | Update an order description or photo URL.                 |
| `GET`    | `/users/user-order-list` | Bearer JWT | Get short information about the authenticated user.       |
| `PATCH`  | `/users/update-user`     | Bearer JWT | Update the authenticated user's name or phone number.     |
| `DELETE` | `/users/:id`             | Bearer JWT | Delete a user. Available only to users with role `ADMIN`. |

## Request Examples

Registration:

```bash
curl -X POST http://localhost:3000/auth/registration \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex","phone":"+380671234567","password":"12345678"}'
```

Create order:

```bash
curl -X POST http://localhost:3000/order/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"message":"Interior cleaning is needed","url_photo":"https://example.com/car.jpg"}'
```

Refresh tokens:

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

## Scripts

| Command               | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `npm run start`       | Start the application.                              |
| `npm run start:dev`   | Start the application in watch mode.                |
| `npm run start:debug` | Start the application in debug mode.                |
| `npm run build`       | Build the project into `dist`.                      |
| `npm run start:prod`  | Start the compiled application from `dist/main`.    |
| `npm run lint`        | Run ESLint with auto-fix.                           |
| `npm run format`      | Format TypeScript files with Prettier.              |
| `npm run test`        | Run Jest unit tests.                                |
| `npm run test:cov`    | Run unit tests with coverage.                       |
| `npm run test:e2e`    | Run E2E tests if `test/jest-e2e.json` is available. |

## Project Structure

```text
src/
  configurations/     Environment variable mapping
  guards/             JWT and role guards
  model/              Sequelize models: User and Order
  module/
    app/              Root module and health endpoint
    auth/             Registration, login, and refresh token
    order/            Detailing orders
    users/            User profile and account operations
  strategy/           Passport JWT strategy
```

## Database

Models:

- `users`: `id`, `name`, `phone`, `hashPassword`, `role`, timestamps.
- `orders`: `id`, `phone`, `message`, `url_photo`, `user_id`, timestamps.

`SequelizeModule` currently uses `synchronize: true`. This is convenient for local development, but production should use migrations and disable automatic schema synchronization.

## Security Notes

- Do not commit `.env` or real JWT secrets.
- Use long and different values for `PRIVATE_KEY` and `REFRESH_PRIVATE_KEY`.
- The access token is short-lived; the refresh token must be stored securely on the client.
- The `ADMIN` role should be assigned only through a trusted process, not public registration.

## Release Check

```bash
npm run build
npm run test
```

If the database is started through Docker:

```bash
docker compose ps
```

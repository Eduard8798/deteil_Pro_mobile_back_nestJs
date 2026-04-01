# 🚀 Detail Pro Mobile Backend

Backend API for mobile application built with **NestJS** and **PostgreSQL**.
The project uses Docker for database orchestration and follows a scalable modular architecture.

---

## 📌 Tech Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **Docker / Docker Compose**
* **TypeORM** *(или Prisma — замени если нужно)*
* **JWT Authentication**

---

## 🏗 Architecture

The application is built using **NestJS modular architecture**:

* **Modules** — feature separation
* **Controllers** — request handling
* **Services** — business logic
* **DTOs** — validation & typing
* **Guards** — authentication/authorization

---

## 📂 Project Structure

```
src/
 ├── auth/          # authentication (JWT)
 ├── users/         # user module
 ├── common/        # guards, decorators, utils
 ├── database/      # DB config
 ├── config/        # env configuration
 ├── app.module.ts
 └── main.ts
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Eduard8798/deteil_Pro_mobile_back_nestJs.git
cd deteil_Pro_mobile_back_nestJs
npm install
```

---

## 🐳 Run PostgreSQL via Docker

```bash
docker-compose up -d
```

Example `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: nest_postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: detail_pro
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## ▶️ Running the app

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

---

## 🔐 Environment Variables

Create `.env` file in root:



---

## 🔑 Authentication

* JWT-based authentication
* Protected routes via Guards
* Login / Register endpoints

---

## 📡 API Endpoints (example)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /auth/login    | Login user     |
| POST   | /auth/register | Register user  |
| GET    | /users         | Get users list |

---

## 🧪 Testing

```bash
npm run test
```

---

## 📦 Features

* Scalable modular architecture
* Dockerized PostgreSQL
* Environment-based configuration
* Input validation (class-validator)
* Secure authentication (JWT)

---

## 🚀 Future Improvements

* Swagger API documentation
* Role-based access (RBAC)
* Refresh tokens
* Docker for full app (backend + DB)
* CI/CD pipeline

---

## 👨‍💻 Author

Eduard

---

## 📄 License

MIT

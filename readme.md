# 🚀 Qualipro – Installation & Configuration Guide

This project includes:
- 🟣 **Frontend:** Quasar (Vue.js 3)
- 🟢 **Backend:** Node.js (v24.11.0) + Express
- 🐬 **Database:** MySQL 8

---

## 📦 Project Structure

```
qualipro/
├── qualipro-front/       # Quasar frontend (Vue.js)
├── qualipro-backend/     # Node.js backend
└── docker-compose.yml    # Docker configuration
```

---

## ⚙️ Requirements

| Component | Version |
|------------|----------|
| Node.js | 24.11.0 |
| npm | 11.6.1 |
| MySQL | 8.x |
| Quasar CLI |

---

## 🧑‍💻 1. Normal Installation (Without Docker)

### 🟢 Backend Setup

```bash
cd qualipro-backend
npm install --save-dev sequelize-cli
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start
```

**Example `.env`:**

```
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=qualipro_db
```

The backend should now run at:
👉 http://localhost:3000

---

### 🟣 Frontend Setup

```bash
cd ../qualipro-front
npm install -g quasar-cli@0.6.5
npm install
npm run dev
```

By default, Quasar runs at:
👉 http://localhost:9000

Make sure the backend API URL is configured in your frontend environment file, e.g. `src/boot/axios.js` or `.env`:

```
VITE_API_URL=http://localhost:3000
```

---

### 🐬 Database (Manual Setup)

1. Install and start MySQL 8 locally.
2. Update `.env` in the backend with your DB credentials.

---

## 🐳 2. Installation with Docker

This is the easiest and most portable method.

### ✅ Requirements
- Docker & Docker Compose installed.

### 🚀 Start the stack
From the root folder:

```bash
docker compose up --build -d
```

This will build and start:

| Service | Port | Description |
|----------|------|-------------|
| `qualipro-front` | 9000 | Quasar frontend |
| `qualipro-backend` | 3000 | Node.js API |
| `qualipro-db` | 3307 (host) → 3306 (container) | MySQL database |

Access:
- Frontend → http://localhost:9000  
- Backend → http://localhost:3000  

---

### 🧾 Docker Environment Overview

#### `qualipro-backend/.env` example
```
NODE_ENV=local
PORT=3000

DB_HOST=qualipro
DB_PORT=3306
DB_USER=qualipro
DB_PASSWORD=qualipro_pass
DB_NAME=qualipro_db
```

---

### 🧱 Docker Containers

| Service | Description |
|----------|--------------|
| `qualipro-backend` | Node.js API (connects to MySQL via service name `qualipro`) |
| `qualipro-front` | Quasar built and served by Nginx |
| `qualipro` | MySQL 8 persistent database |

All services are connected via the Docker network `qualipro-net`.

---

### 📦 Data Persistence
Database data is stored in a Docker volume:
```
volumes:
  db_data:
```
So it remains intact even after container restarts.

---

### 🧹 Useful Commands

| Command | Description |
|----------|-------------|
| `docker compose up --build -d` | Start containers in background |
| `docker compose down` | Stop containers |
| `docker compose down -v` | Stop and delete volumes (erase DB) |
| `docker compose logs -f backend` | Follow backend logs |
| `docker exec -it qualipro-db mysql -uqualipro -pqualipro_pass` | Access MySQL CLI |

---
## 🧑‍💻 Admin (test)
  email : example@example.com

  password : password123

---

## 🧠 Tips

- Update Quasar API base URL in `qualipro-front` to point to your backend (e.g., `http://localhost:3000`).

---

## 🏁 Summary

| Environment | Frontend | Backend | Database |
|--------------|-----------|----------|-----------|
| Normal | http://localhost:9000 | http://localhost:3000 | local MySQL |
| Docker | http://localhost:9000 | http://localhost:3000 | mysql://qualipro-db:3306 |

---

**Author:** Said Ibrahim 
**Stack:** Quasar + Node.js + MySQL 8 + Docker

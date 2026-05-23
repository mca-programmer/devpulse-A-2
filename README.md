# 🚀 DevPulse API

> **Internal Tech Issue Tracker** — A secure, role-based REST API built with Node.js, TypeScript, Express, and PostgreSQL.

🌐 **Live URL:** https://devpulse-api-gb3p.onrender.com

---

## ✨ Features

- 🔐 User authentication with JWT (Signup & Login)
- 👥 Role-based access control — `contributor` & `maintainer`
- 📋 Full CRUD operations on issues
- 🛡️ Secure middleware & protected routes
- ✅ Strictly typed with TypeScript (no `any` types)
- 🧩 Modular architecture: `modules/`, `utils/`, `config/`, `middleware/`
- ♻️ Reusable utility functions for response formatting & error handling

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL (NeonDB) |
| Auth | JWT + bcrypt |
| Deployment | Render |

---

## 📁 Project Structure

```
src/
├── config/         # DB connection, environment config
├── middleware/     # Auth guard, error handler
├── modules/        # Feature modules (auth, issues)
│   ├── auth/
│   └── issues/
└── utils/          # Response formatter, async handler, SQL helpers
```

---

## 📡 API Endpoints

### 🔑 Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/auth/signup` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |

### 🐛 Issues

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/issues` | Create a new issue | ✅ |
| `GET` | `/api/issues` | Get all issues | ✅ |
| `GET` | `/api/issues/:id` | Get single issue | ✅ |
| `PATCH` | `/api/issues/:id` | Update an issue | ✅ |
| `DELETE` | `/api/issues/:id` | Delete an issue | ✅ |

### 💚 Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check API status |

---

## 🗄️ Database Schema

### `users` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | Unique user ID |
| `name` | `VARCHAR(100)` | Full name |
| `email` | `VARCHAR(100) UNIQUE` | Email address |
| `password` | `TEXT` | Hashed password (bcrypt) |
| `role` | `VARCHAR(20)` | `contributor` or `maintainer` |
| `created_at` | `TIMESTAMP` | Registration time |

### `issues` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | Unique issue ID |
| `title` | `VARCHAR(200)` | Issue title |
| `description` | `TEXT` | Detailed description |
| `status` | `VARCHAR(50)` | `open`, `in_progress`, `closed` |
| `user_id` | `INTEGER (FK)` | References `users.id` |
| `created_at` | `TIMESTAMP` | Creation time |

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/devpulse.git
cd devpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_neon_db_url
JWT_SECRET=devpulse_secret
JWT_EXPIRES_IN=7d
```

### 4. Run the development server

```bash
npm run dev
```

---

## 🧪 Sample Request & Response

**POST** `/api/auth/signup`

```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "contributor"
}

// Response
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor"
  }
}
```

---

## ☁️ Deployment

| | |
|---|---|
| **Platform** | Render |
| **Database** | NeonDB (PostgreSQL) |
| **Status** | ✅ Live |

---

## 🌐 Health Check

```bash
GET https://devpulse-api-gb3p.onrender.com/api/health

# Response
{
  "success": true,
  "message": "DevPulse API is running"
}
```

---

## 📜 License

This project is for educational purposes as part of an academic assignment.
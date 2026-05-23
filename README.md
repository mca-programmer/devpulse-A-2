# 🚀 DevPulse API

> Internal Tech Issue Tracker built with Node.js, TypeScript, Express, and PostgreSQL.

## 🌐 Live API

| | URL |
|---|---|
| **Base URL** | https://devpulse-api-gb3p.onrender.com |
| **Health Check** | https://devpulse-api-gb3p.onrender.com/api/health |

**Health check response:**
```json
{
  "success": true,
  "message": "DevPulse API is running"
}
```

---

## ⚙️ Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL (NeonDB)
- JWT Authentication
- bcrypt password hashing

---

## 🔐 Features

- User Signup & Login
- JWT Authentication
- Role-based Access (Contributor / Maintainer)
- Create / Read / Update / Delete Issues
- Secure Middleware Protection

---

## 📡 API Endpoints

### Auth

| Method | Endpoint |
|--------|----------|
| `POST` | `/api/auth/signup` |
| `POST` | `/api/auth/login` |

### Issues

| Method | Endpoint |
|--------|----------|
| `POST` | `/api/issues` |
| `GET` | `/api/issues` |
| `GET` | `/api/issues/:id` |
| `PATCH` | `/api/issues/:id` |
| `DELETE` | `/api/issues/:id` |

---

## 🧪 Sample User

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "contributor"
}
```

---

## 🔧 Setup Instructions

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

```env
PORT=5000
DATABASE_URL=your_neon_db_url
JWT_SECRET=devpulse_secret
JWT_EXPIRES_IN=7d
```

---

## ☁️ Deployment

- Hosted on **Render**
- Database: **NeonDB**
- Fully working REST API
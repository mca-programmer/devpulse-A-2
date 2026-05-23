🚀 DevPulse API

Internal Tech Issue Tracker built with Node.js, TypeScript, Express, and PostgreSQL.

🌐 Live API
https://devpulse-api-gb3p.onrender.com
❤️ Health Check (API Status)
https://devpulse-api-gb3p.onrender.com/api/health

👉 এই endpoint ব্যবহার করে তুমি check করতে পারবে server চালু আছে কিনা

Response example:

{
  "success": true,
  "message": "DevPulse API is running"
}
⚙️ Tech Stack
Node.js
TypeScript
Express.js
PostgreSQL (NeonDB)
JWT Authentication
bcrypt password hashing
🔐 Features
User Signup & Login
JWT Authentication
Role-based Access (Contributor / Maintainer)
Create / Read / Update / Delete Issues
Secure Middleware Protection
📡 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
Issues
POST /api/issues
GET /api/issues
GET /api/issues/:id
PATCH /api/issues/:id
DELETE /api/issues/:id
🧪 Sample User
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "contributor"
}
🔧 Setup Instructions
npm install
npm run dev
🔐 Environment Variables
PORT=5000
DATABASE_URL=your_neon_db_url
JWT_SECRET=devpulse_secret
JWT_EXPIRES_IN=7d
☁️ Deployment
Hosted on Render
Database: NeonDB
Fully working REST API
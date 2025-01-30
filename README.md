# Gate Keeper 🔒

**A Modular, Reusable Role-Based Access Control (RBAC) System**  
*Built with the MERN Stack (MongoDB, Express, React, Node.js) + TypeScript*  

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0%2B-green)](https://www.mongodb.com/)

---

## 🎯 Project Goals
1. **Reusable RBAC Core**: Create a plug-and-play authorization system for any MERN stack project.
2. **Enterprise Scalability**: Support dynamic roles, permissions, and multi-tenancy.
3. **Developer Experience**: Offer clear APIs, TypeScript types, and extensible architecture.
4. **Employer-Ready**: Demonstrate modern full-stack patterns (JWT, middleware, containerization).

---

## 🚀 Features

### **Core**
- **Role/Permission Management**: Define granular permissions (`user:read`, `invoice:delete`).
- **JWT Authentication**: Stateless auth with refresh tokens.
- **Middleware-Driven**: `checkPermission('user:edit')` endpoint protection.
- **MongoDB Backend**: Flexible schema for evolving RBAC needs.

### **Frontend**
- **Role-Aware UI**: Auto-hide unauthorized buttons/routes.
- **Material-UI Components**: Modern, themable interface.
- **Context API**: Centralized auth state management.

### **DevOps**
- **Dockerized**: Pre-configured containers for MongoDB + backend/frontend.
- **CI/CD Ready**: GitHub Actions pipeline example.
- **Env-Based Config**: Toggle features via `.env` files.

---

## 🛠️ Tech Stack

| Layer       | Technologies                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Frontend**| React 18, TypeScript, Vite, Material-UI, Axios, React Router 6               |
| **Backend** | Node.js 20, Express, MongoDB 7, Mongoose, TypeScript, JWT, Bcrypt            |
| **DevOps**  | Docker, NGINX, GitHub Actions, Jest, React Testing Library                   |

---

## 🏗️ Architecture

### **Backend Structure

gatekeeper-backend/
├── src/
│   ├── config/        # Env vars, DB connection
│   ├── models/        # MongoDB schemas (User, Role)
│   ├── middleware/    # Auth & RBAC logic
│   ├── routes/        # API endpoints
│   ├── services/      # Business logic (e.g., TokenService)
│   └── app.ts         # Express setup

### **Frontend Structure**
gatekeeper-frontend/
├── src/
│   ├── api/           # Axios API clients
│   ├── components/    # Reusable RBAC-aware UI
│   ├── contexts/      # Auth state management
│   ├── hooks/         # usePermissions(), useRoles()
│   └── pages/         # Next.js-style routing

---

## 📈 Milestones

### **Phase 1: Foundation (Complete)**
- JWT Authentication Flow
- MongoDB User/Role Schemas
- Login Page UI

### **Phase 2: Core RBAC (Current)**
- [ ] Permission Middleware
- [ ] Role Management API
- [ ] Admin Dashboard UI

### **Phase 3: Extensibility**
- [ ] Plugin System (Audit Logs, 2FA)
- [ ] PostgreSQL Adapter
- [ ] CLI Tool

---

## 🛠️ Getting Started

### **Prerequisites**
- Node.js 20+
- MongoDB 7+
- Docker (optional)

### **Installation**
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/gate-keeper.git
   cd gate-keeper
   ```

2. Backend setup:
   ```bash
   cd backend && npm install
   cp .env.example .env  # Update with your secrets
   npm run dev
   ```

3. Frontend setup:
   ```bash
   cd frontend && npm install
   npm run dev
   ```

4. Seed initial data:
   ```bash
   npm run seed  # Creates admin@example.com / admin123
   ```

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.

---

**Built with ❤️ by [Your Name]**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/yourprofile)

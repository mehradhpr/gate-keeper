# Gate Keeper 🔒

**A Modular, Reusable Role-Based Access Control (RBAC) System**  
*Built with the MERN Stack (MongoDB, Express, React, Node.js) + TypeScript*  

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

## 🎯 Project Goals

1. **Build a Modular RBAC Toolkit**  
   Create a reusable authorization system that can be dropped into any Node.js/React project, *not* tied to specific frameworks or databases.

2. **Enterprise-Grade Security**  
   Implement industry standards: JWT authentication, password hashing, and RBAC middleware with zero trust principles.

3. **Developer-First Experience**  
   Prioritize type safety (TypeScript), auto-generated documentation, and intuitive APIs for rapid integration.

## ✨ Core Features

### **Reusable Foundation**
- 🧩 Framework-agnostic RBAC core with no Express/React dependencies  
- 🔄 Database adapter pattern (MongoDB first, PostgreSQL-ready)  
- 📦 Publishable as standalone npm package (`@gatekeeper/core`)

### **Security & Scalability**
- 🔐 JWT authentication with refresh token rotation  
- 🛡️ Declarative permission checks via middleware (`checkPermission('user:delete')`)  
- 🚦 Built-in rate limiting and request validation

### **Frontend Integration**
- 🎨 Themeable UI components (CSS variables + MUI theming)  
- 🛠️ Auto-synced TypeScript types between frontend/backend  
- 🔒 Permission-aware UI guards (`<PermissionBoundary permissions={[...]}>`)

### **Extensibility**
- 🧪 Plugin system for audit logs, 2FA, or custom workflows  
- 📝 Swagger API docs auto-generated from TypeScript types  
- 📦 Optimized Docker images (<150MB) with multi-stage builds

## 📁 Project Structure

```
gatekeeper/
├── 📂 core/                     *Abstract RBAC logic (framework-agnostic)*
│   ├── src/
│   │   ├── types/               *Shared TS interfaces only (no implementations!)*
│   │   │   ├── User.ts          *IUser { id, roles, permissions }*
│   │   │   └── Policy.ts        *IRole, IPermission, AccessRule*
│   │   ├── utils/               *Pure logic helpers*
│   │   │   ├── auth.ts          *Password hashing, token validation logic*
│   │   │   └── rbac.ts          *validatePermission(user: IUser, required: string)*
│   │   └── index.ts             *Exports types/utils (NO framework code!)*
│   └── package.json             *Private package (not published yet)*

├── 📂 backend/                  *Express API*
│   ├── src/
│   │   ├── adapters/            *Core logic implementations*
│   │   │   ├── mongodb/         *Mongo-specific User/Role models*
│   │   │   └── auth/            *Express middleware (JWT, sessions)*
│   │   ├── api/
│   │   │   └── routes/          *Lean endpoints (use core utils + adapters)*
│   │   └── plugins/             *Optional features*
│   │       └── audit-log/       *Example plugin (no core changes!)*

├── 📂 frontend/                 *React UI*
│   └── src/
│       ├── lib/                 *Auto-generated from core types (script)*
│       ├── components/rbac/     *Dumb UI (accepts `permissions` prop)*
│       └── hooks/               *usePermissions() (uses core types)*

├── 📂 scripts/
│   ├── sync-types.ts            *Generates frontend types from core/*
│   └── docker/
│       ├── backend.dockerfile   *Lightweight Node image*
│       └── frontend.dockerfile  *Static build via NGINX*
├── 📂 docs/
├── 📜 docker-compose.yml         *MongoDB + backend/frontend services*
└── 📜 package.json               *Workspace manager (optional)*
```

## Development Roadmap 🗺️

### Milestone 1: Foundation Setup
**Goal**: Secure JWT authentication flow  
**Deliverables**:
- **Backend**  
  ✅ Express + TypeScript boilerplate  
  ✅ `User` schema with password hashing (bcrypt)  
  ✅ `/auth/login` endpoint (JWT generation)  
  ✅ MongoDB connection pool  
- **Frontend**  
  ✅ Login form with error handling  
  ✅ Auth context (token storage, logout)  
  ✅ Axios interceptor for JWT  

**Checkpoint**:  
Demo of secure login flow with hashed passwords and token refresh.

### Milestone 2: Core RBAC Implementation
**Goal**: Role-based endpoint protection  
**Deliverables**:
- **Backend**  
  ✅ `Role` & `Permission` schemas (MongoDB)  
  ✅ Middleware: `checkPermission('user:read')`  
  ✅ Protected `GET /users` endpoint  
  ✅ Automated role seeding script  
- **Frontend**  
  ✅ `<ProtectedRoute>` component  
  ✅ Role-based navigation menu  

**Checkpoint**:  
Video demo showing Admin vs User access differences.

### Milestone 3: User & Role Management
**Goal**: Enterprise-grade admin dashboard  
**Deliverables**:
- **Backend**  
  ✅ CRUD APIs: `/users`, `/roles`  
  ✅ Bulk permission assignment endpoint  
- **Frontend**  
  ✅ User table with pagination/search  
  ✅ Drag-and-drop role editor  
  ✅ Permission toggle UI (checkboxes)  
  ✅ Audit log component scaffold  

**Checkpoint**:  
GIF showing role creation and real-time permission updates.

### Milestone 4: Theming System
**Goal**: White-label ready UI  
**Deliverables**:
- ✅ Theme provider with CSS variables  
- ✅ `theme.json` config (colors, fonts)  
- ✅ Dark mode support  
- ✅ Reusable component library  

### Milestone 5: Production Deployment
**Goal**: Cloud-ready infrastructure  
**Deliverables**:
- ✅ Dockerfiles (Node + React + MongoDB)  
- ✅ GitHub Actions CI/CD pipeline  
- ✅ Load testing (10k req/sec benchmark)  
- ✅ Swagger docs with OAuth2 support  

**Checkpoint**:  
Screenshot of Docker dashboard + passing CI tests.

### Milestone 6: Plugin Ecosystem
**Goal**: Future-proof architecture  
**Deliverables**:
- ✅ Plugin interface (`IPlugin`)  
- ✅ Audit log plugin (Mongo/File)  
- ✅ PostgreSQL adapter  
- ✅ CLI tool for user management  

**Stretch Goals**:
- SSO Integration (Keycloak/OAuth2)  
- Rate limiting middleware  
- Multi-tenant RBAC  

**Checkpoint**:  
Side-by-side comparison of MongoDB vs PostgreSQL performance.


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

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.

---

**Built with ❤️ by [Your Name]**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/yourprofile)
```

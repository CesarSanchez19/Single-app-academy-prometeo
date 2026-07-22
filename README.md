# Prometeo

> Fullstack monorepo with React + Vite (frontend) and Node.js + Express (backend), managed with pnpm workspaces and MongoDB Atlas.

---

## ℹ️ Information & Prerequisites

Before you start, make sure you have the following installed on your machine:

| Tool | Minimum Version | Download |
|-------------|----------------|----------|
| Node.js     | >= 18.x        | https://nodejs.org |
| pnpm        | >= 8.x         | https://pnpm.io/installation |
| Git         | any     | https://git-scm.com |

> **How to verify if you have them installed?**
> ```bash
> node -v
> pnpm -v
> git -v
> ```

---

## 📥 Project Creation & Installation

### 1. Clone the repository

```bash
git clone https://github.com/TU_USUARIO/prometeo.git
cd prometeo
```

### 2. Install dependencies

From the **project root**, run:

```bash
pnpm install
```

> This single command installs **all** frontend and backend dependencies automatically, thanks to pnpm workspaces.

---

## ⚙️ Project Configuration

Environment variable files (`.env`) **are not included in the repository** for security reasons. You must create them manually in the **project root**.

### Copy from example file

If the project provides a `.env.example` file, you can use it as a base:

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

## 🚀 Commands

### Run Everything in Parallel (Recommended)

```bash
pnpm dev
```

### Run Services Separately

Open **two terminals** in the root folder `prometeo/`:

**Terminal 1 - Backend:**
```bash
pnpm dev:backend
```

**Terminal 2 - Frontend:**
```bash
pnpm dev:frontend
```

### Verify it's working

Once started, open your browser at:

| Service  | URL                                   |
|-----------|---------------------------------------|
| Frontend  | http://localhost:5173                 |
| Backend   | http://localhost:3000/api/v1/health   |

---

## 🌱 Seed Test Credentials

These 12 accounts are created by `pnpm seed` for testing purposes.

### Admin Accounts (role: admin)

| Email | Password |
|---|---|
| admin1@prometeo.com | Admin123! |
| admin2@prometeo.com | Admin123! |
| admin3@prometeo.com | Admin123! |
| admin4@prometeo.com | Admin123! |
| admin5@prometeo.com | Admin123! |
| admin6@prometeo.com | Admin123! |

### User Accounts (role: user)

| Email | Password |
|---|---|
| user1@prometeo.com | User123! |
| user2@prometeo.com | User123! |
| user3@prometeo.com | User123! |
| user4@prometeo.com | User123! |
| user5@prometeo.com | User123! |
| user6@prometeo.com | User123! |

### Usage

```bash
# From project root
pnpm seed

# From backend directory
pnpm seed
```

The script is idempotent — running it multiple times will skip existing accounts.

---

## 🛠️ Technologies Used

**Frontend**
- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Bundler and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS styling framework
- [React Router](https://reactrouter.com/) - Client-side routing
- [Lucide React](https://lucide.dev/) - Icon library

**Backend**
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) - NoSQL Database & Object Modeling
- [Resend](https://resend.com/) - Email delivery API
- [React Email](https://react.email/) - Email template building
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [JSON Web Token (JWT)](https://jwt.io/) - Authentication & Authorization
- [Helmet](https://helmetjs.github.io/) - Security middleware
- [CORS](https://www.npmjs.com/package/cors) & [dotenv](https://www.npmjs.com/package/dotenv) - Cross-Origin Resource Sharing & Environment variables

**Tooling**
- [pnpm](https://pnpm.io/) - Package manager with workspaces support

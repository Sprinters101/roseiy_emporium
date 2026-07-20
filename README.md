# Roseiy Emporium 🍾🍷

Roseiy Emporium is a premium e-commerce platform curated for exceptional taste, specializing in authentic champagnes, fine wines, and premium spirits. Built using modern, high-performance web technologies, the application delivers a premium, smooth, and highly responsive user experience.

---

## 🚀 Tech Stack

The application is powered by the following core technologies:

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite 8](https://vite.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the `@tailwindcss/vite` plugin for build-time compilation)
*   **Routing:** [React Router v8](https://reactrouter.com/) (declarative routing with support for nested layouts and auth guards)
*   **Data Fetching & State:** [TanStack React Query v5](https://tanstack.com/query) (for optimized query caching and API state management)
*   **UI & Design System:**
    *   [@base-ui/react](https://base-ui.com/) (unstyled components for custom, accessible UI)
    *   [Lucide React](https://lucide.dev/) (clean, consistent icons)
    *   `class-variance-authority` (CVA) & `tailwind-merge` (for robust component styling and variant support)
    *   `tw-animate-css` (smooth micro-animations and transitions)
    *   Geist & Playfair Display fonts (premium typography)

---

## 📂 Project Structure

```text
roseiy_emporium/
├── src/
│   ├── assets/          # Static image and visual assets (logos, background decorations)
│   ├── components/      # UI components
│   │   ├── common/      # Global layout components (Navbar, CartDrawer, Container)
│   │   ├── home/        # Home/Landing page specific components (Hero, Home)
│   │   └── ui/          # Low-level UI primitives (Button, Card, Dialog, Sheet, etc.)
│   ├── config/          # Configurations for Axios (apiClient) and React Query (queryClient)
│   ├── layouts/         # High-level layouts (PublicLayout, DashboardLayout)
│   ├── lib/             # Shared utilities (cn helper) and site static data (site_data)
│   ├── routes/          # Router definitions (routes index, route guards)
│   ├── App.tsx          # Router provider initialization
│   ├── main.tsx         # Application entrypoint with global providers
│   └── index.css        # Global CSS stylesheet & Tailwind 4 design system configuration
├── public/              # Static public resources
├── tsconfig.json        # TypeScript configuration settings
├── vite.config.ts       # Vite bundler configuration
└── package.json         # Project metadata and dependencies
```

---

## ✨ Features

*   **Premium Landing Page:** A visually stunning hero section featuring premium champagne imagery, gold gradients, elegant typography, and interactive exploration prompts.
*   **Responsive Header & Navigation:** A floating glassmorphic navbar with active route indications (custom vector underlines), profile/action dropdowns, and a responsive mobile drawer menu.
*   **Cart Drawer System:** Integrated sliding cart drawer supporting instant badge count updates and interactive list overlays.
*   **Role-Based Route Guards:** Seamless client and admin route separation using route guard middleware (`ProtectedRoute` and `AdminRoute`).
*   **Lazy-Loaded Dashboards:** Admin panel and dashboard views are optimized with React dynamic imports (`Suspense` and `lazy`) to minimize initial bundle size and boost performance.

---

## 🛠️ Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### 📥 Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### 💻 Development

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will run locally at `http://localhost:5173` (or the next available port).

### 🏗️ Production Build

To compile the TypeScript code and bundle the application assets for production deployment:

```bash
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

### 🔍 Preview Build

To preview the built production app locally:

```bash
npm run preview
```

### 🧹 Linting

To run ESLint and inspect the codebase for code quality issues:

```bash
npm run lint
```

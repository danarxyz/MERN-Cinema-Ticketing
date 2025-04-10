# MERN Cinema Ticketing 🍿🎬 [Mobile Web]

An online cinema ticket purchasing platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with TypeScript on the backend. **This web application is specifically designed and optimized for display on mobile devices.**

It allows users (via mobile browser) to view currently playing movies, select theaters and seats, and make payments using an internal wallet system and the Midtrans payment gateway. It also includes an administrator dashboard for content management.

## Key Features ✨

* Movie Browse: View currently playing movies.
* Theater & Seat Selection: Choose theater location and visually select seats.
* Wallet System & Top-up: Manage wallet balance for payments.
* Ticket Purchasing: Integrated checkout process.
* Online Payment: Midtrans integration.
* Admin Dashboard: Manage movies, theaters, tickets, transactions, etc.

---
💡 **Important:** This application is designed as **Mobile Web**. The UI/UX is optimized for mobile browsers. Desktop viewing may not be optimal.
---

## Tech Stack 💻

* **Frontend:**
    * Framework/Library: React.js
    * Build Tool: Vite
    * Language: TypeScript
    * Styling: Tailwind CSS
    * Component Toolkit: Radix UI, Lucide React _(likely via Shadcn/ui)_
    * State Management: Redux Toolkit
    * Data Fetching/Caching: TanStack Query (React Query)
    * Routing: React Router DOM
    * Forms: React Hook Form w/ Zod Resolver
    * Tables: TanStack Table (React Table)
    * Utilities: Axios, Day.js, Sonner (Toasts), Swiper, Tailwind Merge, clsx, class-variance-authority, react-secure-storage, next-themes
* **Backend:**
    * Runtime: Node.js
    * Framework: Express.js
    * Language: TypeScript
    * Database: MongoDB w/ Mongoose (ODM)
    * Authentication: JWT (jsonwebtoken) & bcrypt (Password Hashing)
    * File Uploads: Multer
    * Validation: Zod
    * Middleware/Utils: CORS, Body-Parser, Dotenv
* **Development:**
    * Nodemon, ts-node (Backend hot-reloading)
    * ESLint (Linting)
    * Concurrently (Optional, for running both simultaneously)


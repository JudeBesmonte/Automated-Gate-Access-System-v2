# Automated Gate Access System V2

This project is a cleaned-up Next.js template for a new access-control system. It keeps the essential authentication flow for sign-up and sign-in, while leaving the rest of the app in a lighter, static frontend form that can be expanded for a new product.

## Core template behavior

- Auth flow remains in place with NextAuth and Prisma-backed user credentials.
- Frontend can be used as a static landing and access dashboard shell.
- Business-specific QBYFI functionality has been removed from the visible app branding and landing content.

## Getting Started

Copy the environment template and update your values before starting the app.

```bash
bun install
bun run dev
```

## Stack

- TypeScript
- Next.js 15
- Tailwind CSS
- shadcn/ui
- Prisma
- Auth.js
- TanStack Query

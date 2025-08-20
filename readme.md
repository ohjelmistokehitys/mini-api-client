# Mini API Client

This is a small educational project designed for classroom exercises about Git workflows, TypeScript, Node.js and Hono.

The app mimics a minimal API client (like Postman or Bruno) where users can send HTTP requests, with a **frontend**, **API backend/serverless functions**, and **shared TypeScript types**.

## 📂 Repository Structure

```
mini-api-client/
├── package.json          # root workspace config
├── frontend/         # React + Vite app (UI for sending requests)
├── api/              # Hono backend (proxy / serverless entry point)
└── shared/           # Shared types and utilities (TypeScript only)
```

* **frontend**
  React + Vite UI that lets the user specify URL, method, headers, and body, and shows responses.

* **api**
  Hono-based backend that proxies external requests. Future-ready for deployment as serverless functions.

* **shared**
  TypeScript types (`RequestPayload`, `ResponsePayload`, etc.) used by both frontend and api.


## 🛠️ Tech Stack

* **Monorepo**: npm workspaces
* **Frontend**: React, Vite, TypeScript
* **Backend**: Hono (Node), deployable as serverless functions
* **Shared**: TypeScript type definitions
* **Tooling**:

  * TypeScript configured at root
  * Common dev dependencies hoisted to root

## 🚀 Getting Started

### 1. Install dependencies and run tests

```bash
npm install
npm test
```

### 2. Run the API (backend / functions)

```bash
# on the repository root
npm run api
```

### 3. Run the frontend

```bash
# on the repository root
npm run frontend
```


## 📦 Future Directions

* Publish the `api` package as **serverless functions** (Cloudflare / Vercel / Netlify / AWS Lambda).
* Add more features to the frontend (history, tabs, saving requests).
* Expand shared utilities (validation, response parsing).


## About the exercise

This exercise has been created by Teemu Havulinna and is licensed under the [Creative Commons BY-NC-SA license](https://creativecommons.org/licenses/by-nc-sa/4.0/).

AI tools such as ChatGPT and GitHub Copilot have been used in the implementation of the task description, source code, data files and tests.

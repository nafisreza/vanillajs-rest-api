# E-commerce Vanilla JS REST API

A minimal REST API built with Node.js core modules (no frameworks). It implements authentication, role-based access control, and basic product and order management using JSON files as storage. It adopts the Model-View-Controller (MVC) design pattern, a widely employed architectural principle in software development.

## Project Context

This project is developed by me for the Software Project Lab (SWE 4304) during the 3rd semester at the Islamic University of Technology.

## Features

- User registration and login
- Role-based access control (admin, user)
- Products: list, get by id, create/update/delete (admin only)
- Orders: create, get by id (owner or admin), list my orders, update/delete (admin only)

## Tech stack

- Just JavaScript / Node.js

## Configuration

- Server port: 3000 (see `server.js`).
- Token secret: edit `utils/jwt.js` and set `SECRET_KEY` to a secure value before running.

## Getting started

### Prerequisites

- Node.js 18+ (recommended Node 22)

### Install

```powershell
npm install
```

### Run


```powershell
npm run dev
```


The API will be available at http://localhost:3000.

### Docker

Build and run the container:

```powershell
docker build -t vanillajs-rest-api .
docker run --rm -p 3000:3000 vanillajs-rest-api
```

Note: The app listens on port 3000 inside the container.

## API reference

Base URL: `http://localhost:3000`

### Auth

- POST `/register`
  - Body: `{ "username": string, "password": string, "role?": "admin" | "user" }`
  - Response: `201 { id, username, role }`

- POST `/login`
  - Body: `{ "username": string, "password": string }`
  - Response: `{ status: "success", data: { token, user } }`

- POST `/logout` (auth required)
  - Response: `{ status: "success", message: "Logged out successfully" }`

### Products

- GET `/products`
  - Optional query: `?filter=<category>` to filter by category.
  - Response: `200 Product[]`

- GET `/products/:id`
  - Response: `200 Product` or `404`

- POST `/products` (admin)
  - Body: free-form product fields, e.g. `{ "name": string, "price": number, "category": string, "description?": string }`
  - Response: `201 Product`

- PATCH `/products/:id` (admin)
  - Body: partial fields to update
  - Response: `200 Product` or `404`

- DELETE `/products/:id` (admin)
  - Response: `200 { success: string }`

### Orders

- POST `/orders` (auth)
  - Body: free-form order payload (e.g. `{ items: [{ productId, quantity }], total }`)
  - Response: `201 Order`

- GET `/orders/:id` (auth)
  - Owner or admin can access
  - Response: `200 Order` or `404` or `403`

- GET `/orders` (auth)
  - Returns orders for the authenticated user
  - Response: `200 Order[]`

- PATCH `/orders/:id` (admin)
  - Body: partial fields to update (e.g. `{ status: "shipped" }`)
  - Response: `200 Order` or `404`

- DELETE `/orders/:id` (admin)
  - Response: `204`

### Notes

- This is a demo project: no input validation, migrations, or production-grade security.
- Tokens are custom-signed; rotate `SECRET_KEY` and prefer a standard JWT library in real projects.






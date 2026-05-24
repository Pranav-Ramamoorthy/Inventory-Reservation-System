# Inventory Reservation System

Live Demo:  
https://inventory-reservation-system-three.vercel.app/

---

# Project Overview

The Inventory Reservation System is a full-stack web application designed to solve one of the most important problems in e-commerce and warehouse systems:

## Preventing overselling during concurrent purchases

The system allows users to:
- View product inventory across multiple warehouses
- Temporarily reserve products during checkout
- Confirm reservations after successful purchase
- Cancel reservations
- Automatically release expired reservations

The project was built using:
- Next.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Supabase
- Tailwind CSS
- Vercel Deployment

---

# Live Deployment

Production URL:

https://inventory-reservation-system-three.vercel.app/

---

# Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

## Database Hosting
- Supabase

## Deployment
- Vercel

---

# Problem Statement

In real-world e-commerce systems, multiple users may try to purchase the same product simultaneously.

Without proper concurrency handling:
- stock may become negative
- duplicate purchases may happen
- inventory may become inconsistent

This project solves these problems using:
- database transactions
- atomic stock updates
- reservation expiration
- concurrency-safe operations

---

# System Features

## Product Inventory Management
- Products stored in PostgreSQL
- Multiple warehouses supported
- Real-time stock visibility

## Reservation System
Users can temporarily reserve stock during checkout.

Each reservation:
- locks inventory temporarily
- has expiration time
- prevents overselling

## Reservation Confirmation
After successful purchase:
- stock is permanently reduced
- reservation status becomes CONFIRMED

## Reservation Release
Users can:
- cancel reservations
- release reserved inventory

## Automatic Expired Reservation Cleanup
Expired reservations are automatically:
- released
- inventory restored

## Real-Time Stock Synchronization
Frontend refreshes stock automatically.

---

# Database Design

## Product Table
Stores:
- product information
- product names

## Warehouse Table
Stores:
- warehouse details
- warehouse names

## Inventory Table
Stores:
- stock quantity
- reserved stock
- warehouse-product relationships

## Reservation Table
Stores:
- reservation records
- reservation status
- expiration time

---

# Reservation Workflow

## Step 1 — Reserve Product
When user clicks Reserve:
1. system checks stock availability
2. reservedStock increases
3. reservation created with expiry time

## Step 2 — Confirm Purchase
When purchase succeeds:
1. totalStock decreases
2. reservedStock decreases
3. reservation becomes CONFIRMED

## Step 3 — Release Reservation
If user cancels:
1. reservedStock decreases
2. reservation becomes RELEASED

## Step 4 — Automatic Cleanup
Expired reservations are:
1. detected automatically
2. inventory restored
3. reservation released

---

# Concurrency Handling

The project prevents race conditions using:

## Database Transactions
Critical operations are wrapped inside Prisma transactions.

## Atomic Updates
Stock operations use:
- increment
- decrement

to avoid inconsistent updates.

## ACID Principles
The system follows:
- Atomicity
- Consistency
- Isolation
- Durability

---

# API Endpoints

## Products API

```http
GET /api/products
```

Returns all products with inventory information.

---

## Warehouses API

```http
GET /api/warehouses
```

Returns warehouse details.

---

## Create Reservation

```http
POST /api/reservations
```

Creates temporary reservation.

---

## Confirm Reservation

```http
POST /api/reservations/:id/confirm
```

Confirms reservation after successful purchase.

---

## Release Reservation

```http
POST /api/reservations/:id/release
```

Cancels reservation and restores stock.

---

## Cleanup Expired Reservations

```http
POST /api/cleanup-expired-reservations
```

Automatically releases expired reservations.

---

# Frontend Features

## Product Listing
Displays:
- products
- warehouse inventory
- available stock

## Reservation Checkout Page
Displays:
- reservation details
- reservation status
- countdown timer

## Real-Time Updates
Frontend refreshes stock periodically.

---

# Project Architecture

```text
Frontend (Next.js + React)
        ↓
API Routes (Next.js Backend)
        ↓
Prisma ORM
        ↓
PostgreSQL Database (Supabase)
```

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/Pranav-Ramamoorthy/Inventory-Reservation-System.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
```

---

## Run Development Server

```bash
npm run dev
```

---

## Open Application

```text
http://localhost:3000
```

---

# Deployment

## Frontend + Backend Hosting
- Vercel

## Database Hosting
- Supabase PostgreSQL

---

# Important Engineering Concepts Used

- Full-stack architecture
- REST API design
- Database normalization
- Concurrency control
- Transactions
- Atomic operations
- Reservation systems
- Background cleanup workflows
- Cloud deployment
- Serverless functions

---

# Challenges Faced During Development

## Concurrent Reservation Handling
Solved using:
- Prisma transactions
- atomic database updates

## Preventing Overselling
Implemented stock validation before reservation confirmation.

## Expired Reservation Cleanup
Built automatic cleanup workflow for abandoned reservations.

## Vercel + Prisma Deployment Issues
Solved using:
- Prisma generate during build
- Supabase pooled connection URL
- environment variable configuration

---

# Future Improvements

- User authentication
- Admin dashboard
- Payment gateway integration
- WebSocket real-time updates
- Redis caching
- Queue-based cleanup workers
- Order history
- Analytics dashboard

---

# Author

## Pranav R

Integrated M.Tech Software Engineering  
VIT Chennai

GitHub Repository:

https://github.com/Pranav-Ramamoorthy/Inventory-Reservation-System

---

# Final Outcome

This project demonstrates:
- full-stack development
- backend engineering
- transactional database systems
- concurrency-safe architecture
- production deployment workflows
- cloud database integration

It represents a real-world inventory reservation workflow similar to systems used in modern e-commerce platforms.
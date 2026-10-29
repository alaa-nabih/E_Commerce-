# E-Commerce Backend API

A robust, scalable, and modular E-Commerce RESTful API built with **NestJS**, **MongoDB (Mongoose)**, and **TypeScript**. This project features a full authentication and authorization system with OTP-based email verification, event-driven communication, generic repository pattern, and dual-layer data validation.



## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack & Tools](#-tech-stack--tools)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [License](#-license)


## 🚀 Features

- **Modular Architecture**: Built following NestJS modular design for clean separation of concerns.
- **Authentication & Security**:
  - Secure password hashing using `bcrypt`.
  - Stateless authentication with **JWT (JSON Web Tokens)**.
  - Role/Access protection with custom NestJS `AuthGuard`.
  - OTP generation via `nanoid` for email confirmation and password reset.
  - Auto-expiring OTP records utilizing MongoDB TTL indexes.
- **Event-Driven Email System**:
  - Decoupled asynchronous email handling using Node.js `EventEmitter`.
  - HTML email templates powered by dynamic template generator.
  - SMTP transport via `nodemailer`.
- **Generic Repository Pattern**:
- **Data Validation & Transformation**:
  - Schema-based request body validation using **Zod** (`ZodPipe`).
  - Class-based validation using **class-validator** & **class-transformer** with NestJS `ValidationPipe`.
- **Standardized API Responses**:
  - Global `successHandlerInterceptor` ensuring unified response structures (`{ msg, status, data }`) and request latency monitoring.


## 🛠️ Tech Stack & Tools

### 1. Core Framework & Runtime
| Tool / Library | Version | Description |
| **Node.js** | `>= 18` | JavaScript runtime engine |
| **NestJS** (`@nestjs/core`, `@nestjs/common`) | `^11.0.1` | Progressive TypeScript framework for building efficient and scalable server-side applications |
| **TypeScript** | `^5.7.3` | Strongly typed superset of JavaScript |
| **Express** (`@nestjs/platform-express`) | `^11.0.1` | Underlying HTTP server 
| **RxJS** | `^7.8.1` | Reactive extensions library for managing asynchronous workflows, interceptors, and observables |
| **Reflect Metadata** | `^0.2.2` | Enables declarative metadata annotations for TypeScript decorators |

### 2. Database & Data Modeling
| Tool / Library | Version | Description |
| **MongoDB** | `>= 6.0` | NoSQL document database |
| **Mongoose** | `^8.20.1` | Elegant Object Data Modeling (ODM) library for MongoDB |
| **@nestjs/mongoose** | `^11.0.3` | Mongoose integration module for NestJS |

### 3. Authentication & Security
| Tool / Library | Version | Description |
| :--- | :--- | :--- |
| **@nestjs/jwt** | `^11.0.2` | NestJS module for issuing and verifying JSON Web Tokens (JWT) |
| **Bcrypt & BcryptJS** | `^6.0.0` / `^3.0.3` | Cryptographic library for salt generation and secure password hashing |
| **Crypto** | `^1.0.1` | Cryptographic functionality for secure hashing and generation |
| **Nanoid** | `^5.1.6` | Fast, URL-friendly unique ID generator used to generate custom numeric 6-digit OTP codes |

### 4. Validation & Request Processing
| Tool / Library | Version | Description |
| :--- | :--- | :--- |
| **Zod** | `^4.1.13` | TypeScript-first schema declaration and data validation library |
| **class-validator** | `^0.14.3` | Decorator-based property validation for DTOs |
| **class-transformer** | `^0.5.1` | Transforms plain objects to class instances and vice versa |
| **@nestjs/mapped-types** | `*` | Utilities for transforming and extending DTO types (e.g. `PartialType`) |

### 5. Email & Communication
| Tool / Library | Version | Description |
| **Nodemailer** | `^7.0.11` | Cross-platform module for sending emails via SMTP |
| **Node.js EventEmitter** | Built-in | Native pub/sub event emitter to trigger asynchronous email notifications |

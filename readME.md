# 🚕 Uber Backend Clone

A backend-focused clone of the Uber application built using **Node.js, Express.js, MongoDB, RabbitMQ, and JWT authentication**.

The project follows a **microservices architecture**, where different services such as users, captains, and rides can operate independently and communicate with each other.

## 🚀 Features

* User registration and login
* Captain/Driver registration and authentication
* JWT-based authentication
* Secure password hashing using bcrypt
* MongoDB database integration
* Microservices-based architecture
* RabbitMQ for communication between services
* RESTful API design
* Environment variable configuration
* Modular and scalable folder structure
* Error handling and validation

## 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JSON Web Token (JWT)
* bcrypt

**Message Broker**

* RabbitMQ

**Development Tools**

* Nodemon
* Postman
* Git
* GitHub

## 📁 Project Structure

```text
uber-backend/
│
├── user/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── app.js
│   └── server.js
│
├── captain/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── app.js
│   └── server.js
│
├── ride/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
│
├── gateway/
│
├── .gitignore
└── README.md
```

> The exact structure may change as development continues.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd uber-backend
```

### 3. Install dependencies

Install dependencies inside each microservice.

```bash
cd user
npm install
```

Repeat the same process for the other services.

```bash
cd ../captain
npm install

cd ../ride
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the required services.

Example:

```env
PORT=3001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RABBIT_URL=your_rabbitmq_connection_url
```

Never upload your `.env` file or private credentials to GitHub.

Add it to `.gitignore`:

```gitignore
node_modules/
.env
```

## ▶️ Running the Project

Start a service using:

```bash
npm run dev
```

or:

```bash
npm start
```

If the services use different ports, for example:

```text
User Service      → http://localhost:3001
Captain Service   → http://localhost:3002
Ride Service      → http://localhost:3003
API Gateway       → http://localhost:3000
```

## 🔄 Microservices Communication

The application uses **RabbitMQ** for asynchronous communication between services.

Example flow:

```text
Client
   │
   ▼
API Gateway
   │
   ├──────────────► User Service
   │
   ├──────────────► Captain Service
   │
   └──────────────► Ride Service
                         │
                         ▼
                     RabbitMQ
                         │
                  ┌──────┴──────┐
                  ▼             ▼
             User Service   Captain Service
```

RabbitMQ helps keep the services loosely coupled and allows events/messages to be exchanged without directly depending on another service.

## 🔑 Authentication Flow

```text
User Registration
       ↓
Password Hashing
       ↓
MongoDB
       ↓
User Login
       ↓
Credential Verification
       ↓
JWT Generated
       ↓
Authenticated Request
```

Protected endpoints require a valid JWT token.

Example:

```http
Authorization: Bearer <token>
```

## 📡 API Endpoints

Some example endpoints:

### User Service

```http
POST /register
POST /login
GET  /profile
GET  /logout
```

### Captain Service

```http
POST /register
POST /login
GET  /profile
GET  /logout
```

### Ride Service

```http
POST /ride/create
GET  /ride/:id
```

> API routes will continue to be updated as new functionality is implemented.

## 🧪 API Testing

The APIs can be tested using **Postman**.

Example registration request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## 🛡️ Security

The project follows basic backend security practices:

* Passwords are hashed before being stored
* JWT is used for authentication
* Secrets are stored using environment variables
* Sensitive configuration files are excluded from Git
* Protected routes require authentication



## 🎯 Project Goal

The goal of this project is to understand and implement a **production-style backend architecture** using microservices.

The project focuses on:

* Backend development
* REST API design
* Authentication and authorization
* Database management
* Microservices architecture
* Message queues
* Service-to-service communication
* Scalable backend structure

## 👨‍💻 Author

**Sunny Kumar**

Backend / MERN Stack Developer

## 📄 License

This project is created for **learning and educational purposes**.

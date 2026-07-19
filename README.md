# COLLEX 2.0

COLLEX is a microservice-based campus marketplace designed for college students to buy, sell, and discover products within their campus ecosystem. The project is built using React, Node.js, Express, MongoDB, Docker, and follows a scalable microservices architecture.

## Features

* Student authentication using JWT.
* College ID verification workflow.
* Create, update, and delete listings.
* Explore and search marketplace items.
* Admin moderation panel.
* Dockerized development environment.
* Microservice architecture.
* Ready for Kubernetes deployment.

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### DevOps

* Docker
* Docker Compose
* Kubernetes (planned)

---

## Repository Structure

```text
COLLEX-2.0/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── Backend/
│   ├── auth-service/
│   ├── listing-service/
│   ├── explore-service/
│   └── admin-service/
│
├── docker-compose.yml
└── README.md
```

---

## Microservices

### Auth Service (Port 5000)

Responsible for:

* User registration
* User login
* JWT generation
* Student verification status
* Authentication middleware

### Listing Service (Port 5002)

Responsible for:

* Create listings
* Fetch listings
* Update listings
* Delete listings
* User-specific listings

### Explore Service (Port 5003)

Responsible for:

* Public listing discovery
* Search functionality
* Marketplace browsing

### Admin Service (Port 5004)

Responsible for:

* User approval/rejection
* Listing moderation
* Administrative operations

### MongoDB

All services communicate with a shared MongoDB instance using the `collex` database.

---

## Architecture

```text
Frontend
    |
----------------------------------------------------
|            |               |                    |
Auth      Listing         Explore              Admin
Service   Service         Service              Service
    \          |              |                /
     \         |              |               /
      -----------------------------------------
                        |
                    MongoDB
```

---

## Getting Started

### Prerequisites

* Docker
* Docker Compose
* Node.js (optional for local development)

### Clone the Repository

```bash
git clone <repository-url>
cd COLLEX-2.0
```

### Start the Application

```bash
docker compose up --build
```

### Stop the Application

```bash
docker compose down
```

---

## Service Endpoints

| Service         | URL                       |
| --------------- | ------------------------- |
| Frontend        | http://localhost:3000     |
| Auth Service    | http://localhost:5000     |
| Listing Service | http://localhost:5002     |
| Explore Service | http://localhost:5003     |
| Admin Service   | http://localhost:5004     |
| MongoDB         | mongodb://localhost:27017 |

---

## Environment Variables

### Auth Service

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/collex
JWT_SECRET=your_secret
```

### Listing Service

```env
PORT=5002
MONGO_URI=mongodb://mongo:27017/collex
AUTH_SERVICE_URL=http://auth-service:5000/api/v1/auth
```

### Explore Service

```env
PORT=5003
MONGO_URI=mongodb://mongo:27017/collex
```

### Admin Service

```env
PORT=5004
MONGO_URI=mongodb://mongo:27017/collex
LISTING_SERVICE_URL=http://listing-service:5002/api/v1
```

---

## Default Workflow

1. User signs up.
2. User uploads college ID.
3. Account status is marked as `pending`.
4. Admin reviews the request.
5. Admin approves or rejects the user.
6. Verified users can create listings.
7. Other users can browse items through Explore Service.

---

## Future Enhancements

* Kubernetes deployment.
* Redis caching.
* Payment integration.
* Real-time chat.
* Notification service.
* CI/CD using GitHub Actions.
* Monitoring using Prometheus and Grafana.

---

## Deployment

Run the entire application locally:

```bash
docker compose up --build
```

The application will automatically:

* Start MongoDB.
* Build all services.
* Seed the admin account.
* Launch the frontend.
* Connect all services together.

---

## License

This project is developed for educational purposes and demonstrates a production-inspired microservices architecture using Docker and Node.js.

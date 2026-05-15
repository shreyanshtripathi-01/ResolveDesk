# ResolveDesk

A Complaint & Ticket Management System built with React frontend and Spring Boot backend, containerized with Docker and automated with CI/CD pipelines.

## Features

- **Complaint Management**: Create, view, update, and delete complaints
- **Dashboard**: Overview of total, pending, and resolved complaints
- **Category Support**: Network, Hostel, Electrical, Water, and Other
- **Status Tracking**: Pending → In Progress → Resolved

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Spring Boot + Maven + Java 21
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions + Jenkins

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shreyanshtripathi-01/ResolveDesk.git
cd ResolveDesk

# Run with Docker Compose
docker-compose up -d
```

## Project Structure

```
ResolveDesk/
├── backend/          # Spring Boot REST API
├── frontend/         # React frontend
├── docker-compose.yml  # Multi-container orchestration
└── .github/          # GitHub Actions workflows
```

## API Endpoints

- `GET /complaints` - List all complaints
- `POST /complaints` - Create a complaint
- `PUT /complaints/{id}` - Update complaint status
- `DELETE /complaints/{id}` - Delete a complaint

## Development

```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm install
npm run dev
```
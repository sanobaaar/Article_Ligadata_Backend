# Express.js Backend API

This is a backend API built with Express.js that provides user authentication (login and signup) and CRUD operations for articles. The application uses MongoDB as the database and Mongoose for object modeling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#Installation)
- [Environment Variables](#.env file)
- [API Endpoints](#API Endpoints)
- [Testing](#testing)

## Features

- User authentication with JWT (login and signup)
- CRUD operations for articles
- MongoDB integration with Mongoose
- Input validation and error handling

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Jest and Supertest for testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   npm install
   npm start

## .env file

```bash 
PORT=8080;
MONGO_CONN="mongodb+srv://maryamfatima96mf:504602370@cluster0.atpacki.mongodb.net/articles?retryWrites=true&w=majority&appName=Cluster0" 
JWT_KEY="key-123"

## API Endpoints
### Auth Routes
POST /auth/signup: Register a new user
POST /auth/login: Register a new user

### Article Routes
GET /articles: Get all articles
POST /articles/create: Create a new article
PUT /articles/edit/id: Edit an existing article with help of ID 
DELETE /articles/delete/id:  Delete an existing article with help of ID 

##Testing
```bash
npm test





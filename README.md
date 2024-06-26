# Express.js Backend API

This is a backend API built with Express.js that provides user authentication (login and signup) and CRUD operations for articles. The application uses MongoDB as the database and Mongoose for object modeling.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Links](#links)
- [Installation](#installation)
- [Environment Variables](#envfile)
- [API Endpoints](#apiendpoints)
- [Testing](#testing)
- [Contact](#contact)

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

 ## Links
- [JIRA](https://sanobarfatima96.atlassian.net/jira/software/projects/KAN/boards/1)
- [LINKEDIN](https://www.linkedin.com/in/sanobarfatema11/)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   npm install
   npm start

## envfile
PORT=8080;

MONGO_CONN="mongodb+srv://maryamfatima96mf:504602370@cluster0.atpacki.mongodb.net/articles?retryWrites=true&w=majority&appName=Cluster0" 

JWT_KEY="key-123"



## APIEndpoints
### Auth Routes
- POST /auth/signup: Register a new user
- POST /auth/login: Register a new user

### Article Routes
- GET /articles: Get all articles
- POST /articles/create: Create a new article
- PUT /articles/edit/id: Edit an existing article with help of ID 
- DELETE /articles/delete/id:  Delete an existing article with help of ID 

## Testing

npm test

## Contact
For any questions or suggestions, please contact:
- Name: Sanobar Fatema
- Email: sanobarfatima96@gmail.com
- GitHub: sanobaaar





# Todo-List-API

A simple RESTful API built with Node.js, Express, and MongoDB that allows users to create, read, update, and delete (CRUD) todo items. The API supports user authentication, input validation, and pagination for efficient management of todo lists.

## Features

- User registration and login with hashed passwords
- JWT-based authentication for protected routes
- CRUD operations for todo lists
- Input validation using Joi schemas
- Pagination support for listing todos
- MongoDB integration via Mongoose
- Modular code structure for controllers, models, routes, and middleware

## Endpoints

- `POST /api/user` - Register a new user
- `POST /api/login` - Login and receive a JWT token
- `POST /api/lists` - Create a new todo list (authenticated)
- `GET /api/lists` - Get all todo lists for the authenticated user (supports pagination)
- `GET /api/lists/:id` - Get a single todo list by ID (authenticated)
- `PUT /api/lists/:id` - Update a todo list by ID (authenticated)
- `DELETE /api/lists/:id` - Delete a todo list by ID (authenticated)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your `.env` file with `PORT`, `MONGO_URI`, and `SECRET`
4. Start the server: `npm run dev`

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- Joi
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- normalize-mongoose

## License

ISC
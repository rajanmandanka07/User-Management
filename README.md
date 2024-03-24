# MERN Stack Authentication Project

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack for user authentication. It allows users to register, log in, and log out.The frontend is built with React and styled using Bootstrap, while the backend is built with Node.js and Express.js, with MongoDB as the database.



## Features

- User registration with username, name, surname, email, phone, and password
- User login with email and password
- User authentication using JWT (JSON Web Tokens)
- User logout functionality
- Display of user details
- Responsive design using Bootstrap for styling

## Technologies Used

- MongoDB: NoSQL database for storing user information
- Express.js: Node.js framework for building the backend
- React: Frontend library for building the user interface
- Node.js: JavaScript runtime for running the backend server
- bcrypt.js: Library for hashing passwords
- jsonwebtoken: Library for generating and verifying JWT tokens
- Bootstrap: Frontend framework for responsive design

## Setup Instructions

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the backend server: `npm start`
4. Start the frontend development server: `cd client && npm start`

## API Endpoints

### Registration

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:** `{ "username": "example", "name": "John", "surname": "Doe", "email": "john.doe@example.com", "phone": "1234567890", "password": "password" }`
- **Response:** `{ "msg": "User registered successfully" }`

### Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:** `{ "email": "john.doe@example.com", "password": "password" }`
- **Response:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "user": { "id": "60710b73d8e87d09fc1865e8", "username": "example", "name": "John", "surname": "Doe", "email": "john.doe@example.com", "phone": "1234567890" } }`

### Logout

- **URL:** `/api/auth/logout`
- **Method:** `GET`
- **Response:** `{ "msg": "Logged out successfully" }`

### Get All Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Response:** Array of user objects

## Future Improvements

- Implement password reset functionality
- Add user profile update feature
- Enhance error handling and validation

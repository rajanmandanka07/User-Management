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
3. Start the backend server: `cd back_end && node index or nodemon index`
4. Start the frontend development server: `cd front_end && npm start`

## API Endpoints

### Registration

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:** `{ "username": "abc", "name": "ABC", "surname": "DEF", "email": "abc@gmail.com", "phone": "1234567890", "password": "password" }`
- **Response:** `{ "msg": "User registered successfully" }`

### Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:** `{ "email": "abc@gmail.com", "password": "password" }`
- **Response:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "user": { "id": "60710b73d8e87d09fc1865e8", "username": "abc", "name": "ABC", "surname": "DEF", "email": "abc@gmail.com", "phone": "1234567890" } }`

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

# Workout Tracker

## Project Overview

The **Workout Tracker** is a full-stack web application that allows users to securely log, manage, and track their workouts and meal intake. The application leverages the MERN stack to create a dynamic user experience, facilitating user authentication and data management. It aims to help users maintain their fitness routines and dietary habits efficiently.

## Table of Contents

- [Working of the Project](#working-of-the-project)
  - [User Authentication](#user-authentication)
  - [Workout Management](#workout-management)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Security Features](#security-features)
- [Conclusion](#conclusion)

## Working of the Project

### User Authentication

1. **Registration**:
   - Users can register by providing their email and password.
   - Passwords are hashed using `bcrypt` before being stored in the MongoDB database to ensure security.

2. **Login**:
   - Users log in with their credentials (email and password).
   - The application checks the credentials against the database. If they match, a JSON Web Token (JWT) is generated and sent back to the client.
   - The JWT is stored in cookies (httpOnly) for secure session management.

### Workout Management

1. **Adding Workouts**:
   - After logging in, users can add new workouts, providing details like workout name, weight, repetitions, sets, and group.
   - When a user submits a new workout, the application sends a POST request to the server, where the workout data is saved in the MongoDB database, associated with the user's ID.

2. **Viewing Workouts**:
   - Users can view a list of their workouts grouped by categories (e.g., strength training, cardio).
   - The application fetches the workouts from the database and displays them in a user-friendly format.

3. **Updating and Deleting Workouts**:
   - Users can edit existing workouts by selecting them from the list. The updated details are sent to the server via a PUT request, and the workout is modified in the database.
   - Users can also delete workouts, which removes them from both the UI and the database.

### Food Tracking

- The application allows users to log meals, enabling them to track their dietary intake alongside their workouts. This feature enhances the holistic approach to fitness management.

## Tech Stack

The project employs a variety of technologies, each serving a specific role in the application's architecture:

### Frontend

- **React.js**:
  - A JavaScript library for building user interfaces, React is used for creating dynamic and interactive components. It allows for a responsive UI and seamless navigation between different views.

- **Tailwind CSS**:
  - A utility-first CSS framework that enables rapid styling and responsive design. Tailwind CSS is utilized for creating a modern and aesthetically pleasing interface.

### Backend

- **Node.js**:
  - A JavaScript runtime built on Chrome's V8 engine, Node.js allows for server-side execution of JavaScript code. It provides a non-blocking, event-driven architecture ideal for handling multiple requests concurrently.

- **Express.js**:
  - A minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications. It simplifies the creation of RESTful APIs and middleware handling.

- **MongoDB**:
  - A NoSQL database that stores data in flexible, JSON-like documents. MongoDB is used to manage user information, workout data, and meal logs. It provides high scalability and performance.

- **JSON Web Tokens (JWT)**:
  - A compact, URL-safe means of representing claims to be transferred between two parties. JWTs are used for securely transmitting information between the client and server, allowing for authenticated user sessions.

### Security Features

- **bcrypt**:
  - A library for hashing passwords, bcrypt is employed to secure user passwords during registration. This adds a layer of security, ensuring that user credentials are not stored in plain text.

- **httpOnly Cookies**:
  - The application stores JWTs in cookies with the `httpOnly` flag, which prevents client-side scripts from accessing the tokens. This mitigates the risk of cross-site scripting (XSS) attacks.

## Conclusion

The **Workout Tracker** application is designed to provide users with an easy and secure way to manage their fitness and nutrition. By utilizing the MERN stack, it combines a robust backend with a responsive frontend, creating a seamless user experience. The implementation of security features further ensures that user data is protected. This project demonstrates the effective integration of modern web technologies to solve real-world problems in fitness management.


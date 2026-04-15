# Authentication System (Node.js + PostgreSQL + bcrypt)

## Overview

This project is a simple but complete authentication system built using Node.js. It allows users to register, log in, and access a protected dashboard using session-based authentication.

I built this project to understand how real-world authentication systems work behind the scenes.
No UI styling was used to focus on backend logic.

---

## Features

- User Registration
- Secure Password Hashing using bcrypt
- Login System
- Session-based Authentication
- Protected Dashboard Route
- Logout Functionality

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- bcrypt
- express-session
- EJS
- dotenv

---

## How Authentication Works

### 1. Registration

- User enters username and password
- Password is hashed using bcrypt
- Stored in PostgreSQL database

### 2. Login

- User enters credentials
- System fetches user from database
- bcrypt compares passwords
- If correct → session is created

### 3. Session

- User info stored in session
- Cookie stored in browser
- User stays logged in across pages

### 4. Protected Route

- Dashboard checks session
- Only logged-in users can access it

---

## Database Setup

After creating a new database

Run this SQL:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username TEXT UNIQUE,
password TEXT
);

## How to run the app

Open terminal within the project file and type:
npm init -y
npm i express ejs pg bcrypt express-session dotenv
npm start

Then open your browser and type: http://localhost:3000

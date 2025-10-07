# Jail Management System

A comprehensive web application built using the MERN stack (MongoDB, Express.js, React, Node.js) to manage jail operations efficiently. This system streamlines processes like inmate tracking, visitation requests, incident reporting, and role-based access control.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Work Division](#work-division)
- [GitHub Repository](#github-repository)
- [Create React App Info](#create-react-app-info)

## Features

- **Role-Based Access Control:**
  - **Visitor:** Register, request visits, view visitation history, access guidelines.
  - **Jailer (Admin):** Manage inmates, handle visitation requests, report incidents, manage cells.
  - **Warden (Super Admin):** Manage users (Jailers), oversee transfers, manage policies, generate reports, audit logs.
- **Centralized Database:** Secure storage and management of inmate, visitor, and staff information.
- **Visitation Management:** Streamlined process for visitors to request visits and for staff to approve/deny them.
- **Incident Reporting:** Tools for Jailers to document and track incidents.
- **Cell Management:** Assign and reassign inmates to cells.
- **Transfer Management:** Oversee and approve inmate transfers (Warden).
- **Reporting:** Generate various reports for analytics and planning (Warden).

## Tech Stack

- **Frontend:** React, React Router, Axios, Redux, Create React App
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JSON Web Tokens (JWT), Google OAuth (for visitors)
- **Styling:** CSS (Vanilla)
- **Other:** Bcrypt (for password hashing), Dotenv (for environment variables), Cors (for cross-origin requests)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Uchiha292/Jail-Management-System-Web-Project.git
    cd Jail-Management-System-Web-Project
    ```

2.  Navigate to the project root directory.

## Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd jail-management-system/backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the environment variables as described below.
4.  Start the backend server:
    ```bash
    npm run dev  # Or 'npm start' depending on your package.json scripts
    ```
    The backend server should now be running on `http://localhost:5000`.

## Frontend Setup

1.  Navigate to the `frontend/my-app` directory:
    ```bash
    cd jail-management-system/frontend/my-app
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend should now be running on `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the `backend` directory (`jail-management-system/backend/.env`) with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://SanaanAzfar:742004@cluster0.9eol5.mongodb.net/
GOOGLE_CLIENT_ID=396729223726-co6nsgbplchnjg8efjf2cam969b4lq2k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5173/auth/google/callback
JWT_SECRET=3d84e87eab9c9e8fdf85df34c23ba9232f57e92eabae623df82e9bcfe83e92d7
SESSION_SECRET=your_session_secret_key_here # Add this for express-session if not already set

#  Fullstack project – FastAPI To-Do App (MySQL + SQLAlchemy + React)


This project is a Fullstack service for a simple To-Do application.
It is built using FastAPI and uses MySQL as the database and React as Frontend.
The system supports full CRUD operations: creating, reading, updating, and deleting tasks.


#  Technologies Used

FastAPI – High-performance Python web framework

SQLAlchemy – ORM used to map Python objects to MySQL tables

MySQL – Relational database for storing task data

Pydantic – Data validation and serialization

CORS Middleware – Enables communication with a frontend (React)

React - For the Front-end


# System Architecture

The project consists of five core components:

# a) Pydantic Schemas

These define the structure of data sent to and returned from the API.
Schemas ensure data is validated before it reaches the database and standardized when sent to the client.

# b) Database Model (SQLAlchemy)

The model defines the structure of the tasks table in MySQL.
Each task contains:

a unique ID

a title

a completed flag

SQLAlchemy translates Python objects into SQL queries.

# c) Database Configuration

The project uses environment variables (from a .env file) to configure the database connection.
SQLAlchemy’s engine and session are created here to manage communication with MySQL.

# CRUD Layer

This layer contains functions that interact directly with the database:

Fetch all tasks

Fetch a task by ID

Create a new task

Update an existing task

Delete a task

These functions encapsulate database logic and are reused by the API routes.

# FastAPI Routes

The API exposes endpoints for each CRUD operation.
When a request comes in:

The data is validated using Pydantic.

A database session is opened.

The appropriate CRUD function is executed.

The result is returned as a response.

The API is configured with CORS to allow requests from a frontend (e.g., React running on port 5173).

# Data Flow

The client (frontend) sends a request to the API.

FastAPI validates the request using Pydantic schemas.

A database session is created.

CRUD functions execute operations in MySQL.

SQLAlchemy returns database objects.

FastAPI converts these objects into JSON (supported by Pydantic and orm_mode).

The response is returned to the client.

#  Database Structure

The application uses a single table called tasks, containing:

id – Primary key

title – Description of the task

completed – Boolean indicating task status

#  A short video demonstration of the Project:

https://github.com/user-attachments/assets/fbaa6f2e-4bde-4b87-abb1-5150a10646d4


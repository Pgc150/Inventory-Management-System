# Inventory Management System

A full-stack Inventory Management System built with React.js, Express.js, Tailwind CSS, and MongoDB.
This project enables users to efficiently manage products with features like authentication, CRUD operations, search/filter/sort, and a polished, responsive UI.

# 🌟 Features

User Authentication

Secure login and registration

JWT-based authentication

Product Management (CRUD)

Add, view, edit, and delete products

Each product includes name, description, price, quantity, category, and image

Search, Filter, and Sort

Search products by name

Filter by category

Sort by creation date, price, or quantity

Frontend

Responsive and user-friendly interface using React.js + Tailwind CSS

Form validations for secure data input

Backend

RESTful API with Express.js
MongoDB database integration
API endpoints tested with Postman
Image uploads via Cloudinary (optional)

Smooth animations with Framer Motion


Image uploads via Cloudinary 

Smooth animations with Framer Motion


# Tech Stack

Frontend: React.js, Tailwind CSS, React Router, Framer Motion

Backend: Node.js, Express.js, JWT Authentication

Database: MongoDB Atlas 
Setup Instructions

 # Prerequisite
Node.js & npm installed
MongoDB installed locally or use MongoDB Atlas
Optional: Postman for testing APIs
# 1. Clone the Repository
git clone <repository-url>
cd inventory-management-system

# 2. Backend Setup
cd ims-backend
npm install
# Create a .env file with the following variables:
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>

# Start the server
npm run dev

# 3. Frontend Setup
cd ims-frontend
npm install
Start the frontend:
npm run dev
# Testing APIs
Use Postman to test backend APIs:

POST /api/auth/signup – Register user

POST /api/auth/login – Login user

GET /api/product/list – Get all products

POST /api/product/create – Add a product

PUT /api/product/update/:id – Update product

DELETE /api/product/delete/:id – Delete product






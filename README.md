
# 📦 Inventory Management System

A full-stack **Inventory Management System** designed to manage products efficiently with secure authentication, role-based access, and data export capabilities. This application helps businesses track inventory, update product details, and generate reports seamlessly.

---

## 🚀 Features

### 🔐 Authentication & Security

* User login using **secure HTTP-only cookies**
* Session-based authentication
* Protected routes for authorized users only
* CORS configured with credentials support

### 📦 Product Management

* Add new products with name, price, quantity, and category
* View a complete list of products
* Update existing product details
* Inventory data stored securely in the database

### 🔍 Inventory Insights

* Centralized dashboard to manage inventory
* Easy tracking of product quantities and pricing
* Scalable structure for future analytics and reporting

### 📊 Export & Reporting

* Export complete product data in **CSV format**
* Useful for reporting, backups, and external analysis

### 🌐 Full-Stack Architecture

* RESTful API design
* Clean separation of frontend and backend
* Scalable and maintainable codebase

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Cookie-based authentication

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* MongoDB (local or MongoDB Atlas)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV
```

Start the backend server:

```bash
node index.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

### 4️⃣ Access the Application

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000/api`

---

## 🍪 Authentication Notes

* Authentication is handled using **HTTP-only cookies**
* Axios requests include:

```js
withCredentials: true
```

* Backend CORS is configured to allow credentials

---

## 📸 Screenshots

*Add screenshots of the application UI here*

```md
![Login Page]
<img width="1917" height="927" alt="image" src="https://github.com/user-attachments/assets/c805452d-780e-4fe8-8660-e005562d91c4" />

![Dashboard](screenshots/dashboard.png)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/62c03997-4344-4dbd-9fbd-bed7594ccbc3" />

![Product List]

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/82b51656-670b-4a24-ae70-533938ba8519" />

``
![PieChart
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4ea2a56e-7c2a-4a8b-b33e-0c192dec1594" />

---

---





## 🔗 API Documentation

This application exposes a set of RESTful APIs for authentication and inventory/product management. The backend uses **cookie-based authentication** (HTTP-only cookies), and all protected routes require a valid authentication cookie to be sent with each request.

---

## 🔐 Authentication

### **POST `/api/auth/login`** – Login User

Authenticates a user using email and password. On successful authentication, the server sets an **HTTP-only cookie** which is used to authorize subsequent requests.

* **Method:** `POST`
* **Authentication:** Not required
* **Cookies:** Sets authentication cookie

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Success Response (200)

```json
{
  "message": "Login successful",
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

#### Error Responses

* `401 Unauthorized` – Invalid credentials
* `500 Internal Server Error`

---

## 📦 Product Management

All product-related endpoints are **protected** and require a valid authentication cookie.

---

### **GET `/api/product/list`** – Get All Products

Returns a list of all products stored in the inventory.

* **Method:** `GET`
* **Authentication:** Required (cookie-based)

#### Success Response (200)

```json
[
  {
    "_id": "productId",
    "name": "Product Name",
    "price": 100,
    "quantity": 20,
    "category": "Electronics",
    "createdAt": "2026-02-01T10:30:00Z"
  }
]
```

#### Error Responses

* `401 Unauthorized` – User not authenticated
* `500 Internal Server Error`

---

### **POST `/api/product/create`** – Add Product

Creates a new product entry in the inventory.

* **Method:** `POST`
* **Authentication:** Required (cookie-based)

#### Request Body

```json
{
  "name": "Product Name",
  "price": 200,
  "quantity": 15,
  "category": "Groceries"
}
```

#### Success Response (201)

```json
{
  "message": "Product created successfully"
}
```

#### Error Responses

* `400 Bad Request` – Invalid input data
* `401 Unauthorized`
* `500 Internal Server Error`

---

### **PUT `/api/product/update/:id`** – Update Product

Updates an existing product using its unique ID.

* **Method:** `PUT`
* **Authentication:** Required (cookie-based)

#### URL Parameters

```
:id → Product ID
```

#### Request Body

```json
{
  "price": 180,
  "quantity": 25
}
```

#### Success Response (200)

```json
{
  "message": "Product updated successfully"
}
```

#### Error Responses

* `400 Bad Request`
* `401 Unauthorized`
* `404 Not Found` – Product not found
* `500 Internal Server Error`

---

### **GET `/api/product/export/csv`** – Export Products as CSV

Exports all product data in **CSV format**. This endpoint is useful for reporting, backups, or data analysis.

* **Method:** `GET`
* **Authentication:** Required (cookie-based)
* **Response Type:** `text/csv`

#### Response Headers

```
Content-Disposition: attachment; filename="products.csv"
```

#### Description

Returns product information such as name, price, quantity, category, and timestamps in a downloadable CSV file.

#### Error Responses

* `401 Unauthorized`
* `500 Internal Server Error`

---

## 🍪 Authentication & CORS Notes

* Authentication is handled using **HTTP-only cookies**.
* Frontend API calls must include:

```js
withCredentials: true
```

* Backend CORS configuration must allow credentials and the frontend origin:

```js
credentials: true
```

---

## ✅ Summary

* RESTful API design
* Cookie-based authentication
* Protected product routes
* CSV export support for inventory data

This API is designed to work seamlessly with a React + Axios frontend and a Node.js/Express backend.








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







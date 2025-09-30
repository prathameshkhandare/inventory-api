# 📦 Inventory Management System API

A simple **RESTful API** built with **Node.js, Express, and MongoDB (Mongoose)** to manage inventory.
It allows creating, updating, and deleting products, as well as safely managing stock quantities and detecting low-stock products.

---

## 🚀 Features

* ➕ Create new products
* 📖 Get all products or a single product by ID
* ✏️ Update product details
* ❌ Delete products
* 📈 Increase stock quantity
* 📉 Decrease stock quantity (with validation)
* ⚠️ Get products with stock below their low-stock threshold

---

## 🛠️ Tech Stack

* **Node.js + Express** – Backend framework
* **MongoDB + Mongoose** – Database & ODM
* **Dotenv** – Environment variables
* **Jest (Optional)** – For unit testing
* **Postman** – For API testing



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-api.git
cd inventory-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root [for better understanding i provided one with localmongodb url]:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/inventorydb
```

### 4. Start the Server

```bash
node src/index.js
```

Server will run at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📬 API Endpoints

### Products

* **POST** `/api/products` → Create a new product
* **GET** `/api/products` → Get all products
* **GET** `/api/products/:id` → Get product by ID
* **PUT** `/api/products/:id` → Update a product
* **DELETE** `/api/products/:id` → Delete a product

### Stock Management

* **PUT** `/api/products/:id/increase` → Increase stock quantity
* **PUT** `/api/products/:id/decrease` → Decrease stock quantity

### Low Stock

* **GET** `/api/products/low-stock` → Get all low-stock products

---

## 🧪 Running Tests

You can run tests using:

```bash
npm test
```


---

## 💡 Assumptions & Design Choices

* Stock quantity cannot go below zero
* Increase/Decrease stock handled by **separate endpoints** for clarity & safety
* Mongoose validation ensures correct data types
* Low stock is determined using a **product-specific threshold**

---

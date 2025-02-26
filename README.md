# 📚 **Book Catalog Application**

This is a **Book Catalog** task built using **Express**, **PostgreSQL**, and **React**. The app enables users to manage a collection of books by performing **full CRUD operations** (Create, Read, Update, Delete).

---

## 🛠 **Task Overview**

### 1. **Database Setup (PostgreSQL) 🗄**

In this task, we created a PostgreSQL database named `book_catalog`. The database holds a `books` table to store essential book details such as:

- **Title** 📖: The title of the book.
- **Author** ✍️: The author of the book.
- **Genre** 📚: The genre of the book.
- **Publication Date** 📅: The publication date of the book.
- **Description** 📝: A short description of the book.

We used SQL commands to define the structure of the table and ensure data is stored correctly.

### 2. **Backend Development (Express + PostgreSQL) ⚙️**

We built a **RESTful API** using **Express.js** to interact with the database. The API allows performing CRUD operations on the books:

- **Create** ➕: Add a new book to the database.
- **Read** 👀: Fetch all the books from the database or a single book by its `id`.
- **Update** ✏️: Modify the details of an existing book.
- **Delete** ❌: Remove a book from the database (soft delete to retain data).

We also set up **CORS middleware** to enable communication between the **React frontend** (running on a different port) and the **Express backend**.

### 3. **Frontend Development (React) ⚛️**

On the **frontend**, we built a simple **React app** to display and manage the book catalog. This includes:

- A **book list** view showing all books.
- A **form to add new books** and a **form to edit existing books**.
- Integration with the backend API using **Axios** to make HTTP requests.
- **Form validation** to ensure the data is valid before submission and **error handling** for failed API requests.

We implemented **React Router** for navigation between views, so users can navigate between the book list, add/edit forms, and perform CRUD operations seamlessly.

### 4. **Validation & Error Handling 🚫**

- **Frontend Validation**: The forms include basic validation (e.g., required fields) to ensure that users provide the correct input.
- **Error Handling**: If there is an issue with the API request (such as server errors or validation failures), the frontend shows error messages to inform the user.

---

## ✅ **Features Implemented**

- **Create** ➕: Insert new book records into the database.
- **Read** 👀: Retrieve and display a list of all books.
- **Update** ✏️: Modify existing book details.
- **Delete** ❌: Soft delete a book record from the database.

---

## ⚙️ **Technologies Used**

- **Backend**: Express, PostgreSQL
- **Frontend**: React
- **API Communication**: Axios
- **Database**: PostgreSQL

---

## 🏁 **Conclusion**

This project demonstrates how to set up a **full-stack application** with **Express.js** and **PostgreSQL** for the backend, and **React** for the frontend. It covers all CRUD operations, basic validation, error handling, and integration between the frontend and backend via API calls. The application provides an easy-to-use interface to manage a collection of books.

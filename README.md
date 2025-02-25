# BookStore

## Overview

BookStore is a web application that allows users to manage a collection of books. Users can:

- View a catalog of books
- Add new books to the collection
- Edit book details
- Delete books from the collection

## Features

- **Retrieve Books:** Fetch and display a list of all books.
- **Add Books:** Users can add new books by providing a title, author, genre, publication date, and description.
- **Edit Books:** Modify existing book details.
- **Delete Books:** Remove books from the database.
- **Form Validation:** Ensures required fields are filled before submission.
- **Error Handling:** Displays error messages if API calls fail.

## Tech Stack

- **Frontend:** React.js, Axios, Bootstrap
- **Backend:** Node.js, Express.js, PostgreSQL
- **Database:** PostgreSQL (using pg for database queries)
- **API Communication:** RESTful API endpoints

## API Endpoints

### Books API

- **GET /books** - Retrieve all books
- **POST /books** - Add a new book
- **PUT /books/:id** - Update an existing book
- **DELETE /books/:id** - Remove a book

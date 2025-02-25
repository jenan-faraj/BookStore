const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/** 🔹 READ: Retrieve and display a list of all books */
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** 🔹 CREATE: Add a new book */
app.post("/books", async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { title, author, genre, publicationDate, description } = req.body;

    if (!title || !author || !genre || !publicationDate || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await pool.query(
      "INSERT INTO books (title, author, genre, publication_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, genre, publicationDate, description]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** 🔹 UPDATE: Modify existing book details */
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publicationDate, description } = req.body;

    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5 WHERE id = $6 RETURNING *",
      [title, author, genre, publicationDate, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** 🔹 DELETE: Remove a book record */
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

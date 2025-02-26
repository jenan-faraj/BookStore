const express = require("express");
const cors = require('cors');
const db = require("./db"); 

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
}));


app.post("/books", async (req, res) => {
    try {
        let { title, author, genre, publication_date, description } = req.body;

        // Ensure the date is stored in YYYY-MM-DD format (prevents time zone issues)
        if (publication_date) {
            publication_date = new Date(publication_date).toISOString().split("T")[0];
        }

        const newBook = await db.query(
            "INSERT INTO books (title, author, genre, publication_date, description) VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
            [title, author, genre, publication_date, description]
        );

        console.log("Inserted book:", newBook.rows[0]); 
        res.status(201).json(newBook.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error creating New Book");
    }
});



app.get("/books", async (req, res) => {
    try {
        const books = await db.query(`
            SELECT id, title, author, genre, 
                   TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, 
                   description 
            FROM books WHERE is_deleted = FALSE;
        `);
        res.json(books.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching books " + err);
    }
});


app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publication_date, description } = req.body;

        // Update the book
        const updateBook = await db.query(
            `UPDATE books 
             SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5
             WHERE id = $6 RETURNING *`,
            [title, author, genre, publication_date, description, id]
        );

        res.json(updateBook.rows[0]);
    } catch (err) {
        console.error("Error updating book:", err.message);
        res.status(500).json({ error: "Error updating book" });
    }
});



app.put("/books/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Soft delete the book
        const deleteBook = await db.query(
            "UPDATE books SET is_deleted = TRUE WHERE id = $1 RETURNING *",
            [id]
        );

        res.json({ message: "Book soft deleted successfully", book: deleteBook.rows[0] });
    } catch (err) {
        console.error("Error soft deleting book:", err.message);
        res.status(500).json({ error: "Error soft deleting book" });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

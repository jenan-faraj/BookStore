const Book = require("../models/bookModel");

const bookController = {
  createBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      console.log("Inserted book:", newBook);
      res.status(201).json(newBook);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Error creating new book");
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.json(books);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Error fetching books");
    }
  },

  updateBook: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await Book.update(id, req.body);
      res.json(updatedBook);
    } catch (err) {
      console.error("Error updating book:", err.message);
      res.status(500).json({ error: "Error updating book" });
    }
  },

  softDeleteBook: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.softDelete(id);
      res.json({ message: "Book soft deleted successfully", book: deletedBook });
    } catch (err) {
      console.error("Error soft deleting book:", err.message);
      res.status(500).json({ error: "Error soft deleting book" });
    }
  },
};

module.exports = bookController;

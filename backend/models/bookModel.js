const db = require("../db");

const Book = {
  create: async ({ title, author, genre, publication_date, description }) => {
    if (publication_date) {
      publication_date = new Date(publication_date).toISOString().split("T")[0];
    }
    const result = await db.query(
      "INSERT INTO books (title, author, genre, publication_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, genre, publication_date, description]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await db.query(`
      SELECT id, title, author, genre, 
             TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, 
             description 
      FROM books WHERE is_deleted = FALSE;
    `);
    return result.rows;
  },

  update: async (id, { title, author, genre, publication_date, description }) => {
    const result = await db.query(
      `UPDATE books 
       SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5
       WHERE id = $6 RETURNING *`,
      [title, author, genre, publication_date, description, id]
    );
    return result.rows[0];
  },

  softDelete: async (id) => {
    const result = await db.query(
      "UPDATE books SET is_deleted = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Book;

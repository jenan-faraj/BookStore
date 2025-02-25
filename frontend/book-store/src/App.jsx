import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");

  // Fetch books from backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/books");
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !genre || !publicationDate || !description) {
      setError("All fields are required");
      return;
    }
    setError("");
  
    try {
      if (editingBook) {
        // Update book
        await axios.put(`http://localhost:9000/books/${editingBook.id}`, {
          title,
          author,
          genre,
          publicationDate,
          description,
        });
      } else {
        // Add new book
        await axios.post("http://localhost:9000/books", {
          title,
          author,
          genre,
          publicationDate,
          description,
        });
      }
      fetchBooks();
      clearForm();
    } catch (err) {
      console.error("Error submitting book", err);
      setError("An error occurred while submitting the book. Please try again later.");
    }
  };
  

  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setPublicationDate(book.publicationDate);
    setDescription(book.description);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book", err);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
    setDescription("");
    setEditingBook(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <p className="navbar-brand text-white fw-bold">Booky</p>
        </div>
      </nav>

      <section>
      <div className="contact-container">
        <p>{editingBook ? "Edit Book" : "Add A New Book Here"}</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} id="inputForm">
        <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter book title|"/>

          <label htmlFor="auth">author</label>
          <input type="text" id="auth"  value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter book author|"/>

          <label htmlFor="gen">genre</label>
          <input type="text" id="gen"  value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter book genre|"/>

          <label htmlFor="dat">publication date</label>
          <input type="text" id="dat" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} placeholder="Enter book publication date|"/>

          <label htmlFor="des">description</label>
          <input type="text" id="des" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter book description |"/>

          <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
          {editingBook && <button type="button" onClick={clearForm}>Cancel</button>}
        </form>
        </div>
        <ul>
        <div id="container">
          {books.map((book) => (
            <li key={book.id} className="card">
              <h3>{book.title}</h3>
              <p className="txt1"><strong>Author:</strong> {book.author}</p>
              <p className="txt2"><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Published:</strong> {book.publicationDate}</p>
              <p className="txt3">{book.description}</p>
              <div>
              <div className="edit" onClick={() => handleEdit(book)}><i className='bx bx-edit'></i></div>
              <div className="del" onClick={() => handleDelete(book.id)}><i className='bx bx-message-square-x'></i></div>
              </div>
            </li>
          ))}
              </div>
        </ul>

      </section>


      <footer>
        <div className="copyright">&copy; 2024 Noor Sroor. All Rights Reserved.</div>
      </footer>
    </>
  );
}

export default App;

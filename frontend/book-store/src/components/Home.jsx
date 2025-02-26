import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error loading books", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Book Catalog</h1>
        <p className="text-gray-600">Manage your personal book collection</p>
      </header>
      
      <button
        onClick={() => navigate("/add")}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center shadow-md mb-8"
      >
        <span className="mr-2">➕</span> Add New Book
      </button>
      
      {books.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl mb-2">Your book collection is empty</p>
          <p>Add some books to get started!</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-lg overflow-hidden">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-5 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">{book.author}</span> 
                    {book.genre && <span className="mx-2">•</span>}
                    {book.genre && <span className="italic">{book.genre}</span>}
                  </p>
                  <p className="text-gray-500 text-sm">📅 Published: {book.publication_date}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit/${book.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <span className="mr-1">✏️</span> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <span className="mr-1">🗑</span> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
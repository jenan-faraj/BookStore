import { useState, useEffect } from "react";
import { addBook, updateBook, getBookById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      setIsLoading(true);
      const data = await getBookById(id);
      setBook(data);
    } catch (error) {
      console.error("Error loading book", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (id) {
        await updateBook(id, book);
      } else {
        await addBook(book);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {id ? "✏️ Edit Book" : "📚 Add New Book"}
          </h1>
          <p className="text-gray-600 mt-1">
            {id ? "Update the book information" : "Add a new book to your collection"}
          </p>
        </header>

        {isLoading && !book.title ? (
          <div className="text-center py-8 text-gray-500">Loading book details...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="E.g., Fiction, Mystery, Science Fiction"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700">
                Publication Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="publication_date"
                name="publication_date"
                value={book.publication_date}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Add a brief description of the book"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-70"
              >
                {isLoading ? "Saving..." : id ? "Update Book" : "Add Book"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookForm;
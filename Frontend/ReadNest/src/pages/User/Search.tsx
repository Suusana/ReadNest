import { searchForBook } from "@/service/bookService";
import { Book, BookRoot } from "@/types/book";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const result = location.state.query
  const [Books, setBooks] = useState<BookRoot>({ books: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        await searchForBook(result, setBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [result])

  const viewDetail = (book: Book, id: number) => {
    navigate(`/user/bookDetail/${id}`, { state: book });
  };

  return (
    <div className="bg-gradient-to-b h-screen mx-auto px-6 pb-24 pt-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Result</h2>
      <div className="pb-24">
        {loading ? (
            <span className="text-lg font-semibold">Loading...</span>
        ) : (
          Books.books.length > 0 ? (
            Books.books.map((book) => (
              <div
                key={book.bookId}
                onClick={() => viewDetail(book, book.bookId)}
                className="card max-w-xl w-full bg-base-100 shadow-lg rounded-xl overflow-hidden mb-5 active:ring-2 active:ring-blue-500 active:ring-offset-2 transition duration-200 mb-8"
              >
                <figure>
                  <img src={book.cover} alt={book.cover} className="object-cover w-full h-60" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <span className="text-lg font-semibold">There is no result</span>
          )
        )}
      </div>
    </div>
  );
}

export default Search;
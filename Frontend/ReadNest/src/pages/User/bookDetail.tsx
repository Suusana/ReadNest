import { borrowOrReturnBook, getTagsById, isBorrow } from "@/service/bookService";
import { RootState } from "@/types/user";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const book = location.state;
  const navigate = useNavigate();
  const [Tags, setTags] = useState<string[]>([]); //all the categories
  const [Quantity, setQuantity] = useState<number>(book.quantity);
  const [isborrow, setisBorrow] = useState<boolean>(); //all the categories

  useEffect(() => {
    getTagsById(book.bookId, setTags)
    if (id) {
      isBorrow(user.username, book.title, setisBorrow)
    }
  }, [book])

  const goBack = () => {
    navigate(-1);
  };

  const handleBorrow = (bookname: string) => {
    setisBorrow((prev) => !prev);
    borrowOrReturnBook(bookname, user.username, setQuantity, setisBorrow)
  }

  return (
    <div className="bg-gradient-to-b h-screen mx-auto px-6 py-2">
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <button
          onClick={goBack}
          className="btn btn-ghost">← Back</button>
        <img
          src={book.cover}
          alt={book.title}
          className="object-cover w-full h-96 rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-2/3 md:pl-10">
        <h1 className="text-3xl font-semibold text-gray-800">{book.title}</h1>
        <p className="text-xl text-gray-600 mt-2">Author: {book.author}</p>
        <p className="text-lg text-gray-500 mt-4">{book.description}</p>
        <div className="mt-4 flex flex-wrap space-x-1">
          {Tags.map((tag, index) => (
            <span key={index}
              className="inline-block bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-700 mt-6">Quantity: {Quantity}</span>
          <button
            onClick={() => handleBorrow(book.title)}
            className={`btn btn-primary py-2 px-6 rounded-full my-5 ml-10 text-white ${isborrow ? "bg-slate-700" : "bg-blue-600"}`}>
            {isborrow ? "Return" : "Borrow"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookDetail;

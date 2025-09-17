
import { userMenu } from "@/assets/staticData";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Svg from "@/components/svg";
import { fetchRecommend } from "@/service/bookService";
import { Book, BookRoot } from "@/types/book";
import { RootState } from "@/types/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const path = location.pathname;
  const [Books, setBooks] = useState<BookRoot>({ books: [] });
  const [Value, setValue] = useState('');
  const [empty, setEmpty] = useState(false);

  const goToPage = (path: string) => {
    navigate("/user" + path)
  }

  useEffect(() => {
    fetchRecommend(setBooks);
  }, [])


  const viewDetail = (book: Book, id: number) => {
    navigate(`/user/bookDetail/${id}`, { state: book });
  };

  if (!Books) {
    return <Loading />
  }

  const handleSearch = () => {
    if (Value.trim() === "") {
      setEmpty(true)
    }else{
      navigate("/user/search", { state: { query: Value } })
      setValue('')
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white h-screen flex flex-col justify-between">
      {empty && <Alert content="You can not enter empty value" alertType="alert-error mt-10" onClose={() => setEmpty(false)} />}
      <header className="navbar bg-white shadow-lg px-4 py-3 rounded-b-2xl">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-600">ReadNest</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-blue-300 ring-offset-2">
              <img src={user.avatar} alt="User Avatar" />
            </div>
          </div>
          <span className="font-medium text-gray-700">{user.username}</span>
        </div>
      </header>

      {path === "/user" ?
        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-5">
          <div className="flex justify-center mb-8">
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text text-gray-600">Search for Books</span>
              </label>
              <input
                type="text"
                value={Value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter book name or author..."
                className="input input-bordered w-full text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="btn btn-primary mt-2">Search</button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommended Books</h2>
          {Books?.books.map((book) => (
            <div
              key={book.bookId}
              onClick={() => viewDetail(book, book.bookId)}
              className="card max-w-xl w-full bg-base-100 shadow-lg rounded-xl overflow-hidden mb-5 active:ring-2 active:ring-blue-500 active:ring-offset-2 transition duration-200">
              <figure>
                <img src={book.cover} alt={book.cover} className="object-cover w-full h-60" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold text-gray-800">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
        :
        <Outlet />
      }

      {!path.includes("bookDetail") &&
        <nav className="btm-nav bg-white shadow-lg rounded-t-2xl">
          {userMenu.map((item) => (
            <button key={item.key}
              onClick={() => goToPage(item.key)}
              className={`${path === ("/user" + item.key) ? "text-blue-600 active" : " "}`}>
              <Svg Link={item.icon} />
              <span className="btm-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      }
    </div>
  );
}


export default Home
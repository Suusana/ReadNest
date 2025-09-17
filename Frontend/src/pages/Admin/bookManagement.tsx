import { useEffect, useState } from 'react';
import { Book, bookData, BookRoot, EditbookType } from '@/types/book';
import Alert from '@/components/Alert';
import Reminder from '@/components/reminder';
import { closeDialog, openModal } from '@/utils/uiInteract';
import { addBooks, deleteBooks, editThisBook, fetchBooks, fetchTags, searchBooks } from '@/service/bookService';
import Pagination from "@/components/Pagination"
import TableHeader from '@/components/tableHeader';
import { BooksTableHeaders } from '@/assets/staticData';
import useSelection from '@/hooks/useSelection';
import RecordsPerPage from '@/components/RecordsPerPage';
import usePage from '@/hooks/usePage';
import useSearch from '@/hooks/useSerch';

const BookManage = () => {
  const [Data, setData] = useState<BookRoot | null>(null); // all the books info
  const [Tags, setTags] = useState<string[]>([]); //all the categories

  const { Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();

  const {
    SearchItem, setSearchItem,
    showAlert, setShowAlert,
    prevSearchItem, setPrevSearchItem,
    noResult, setNoResult
  } = useSearch();

  const [noSelect, setNoSelect] = useState<Boolean>(false); //show no selected books to delete
  const [deleteSuccess, setDeleteSuccess] = useState<Boolean>(false); //
  const [addSuccess, setAddSuccess] = useState<Boolean>(false);
  const [BookExist, setBookExist] = useState<Boolean>(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]); //when adding the tags
  const [CategoryTags, setCategoryTags] = useState<string[][]>([]); //when loading

  const {
    selectedItems: selectedBooks,
    handleSelectAll,
    handleSelectItem,
    isAllSelected,
    changePage
  } = useSelection(
    Data?.books || [],
    (book) => book.bookId
  );

  const [EmptyInput, setEmptyInput] = useState({
    title: false,
    author: false,
    description: false,
    quantity: false,
    cover: false
  });

  const [Books, setBooks] = useState<bookData>({
    title: "",
    author: "",
    description: "",
    quantity: ""
  });

  const [Img, setImg] = useState<File | null>(null)

  useEffect(() => {
    if (SearchItem.trim() === '' && prevSearchItem.trim() !== '') {
      // when the search bar become empty,then reload all the books data
      loadBook();
    }
    setPrevSearchItem(SearchItem);
  }, [SearchItem]);

  const loadBook = async () => {
    try {
      const res = await fetchBooks(Page, PageSize);
      const Total = res.data.data.total; //total records
      setTotal(Total)
      setData({ books: res.data.data.rows })
      return res
    } catch (error) {
      console.log("Fail to load books:", error)
    }
  }

  const loadTags = async () => {
    try {
      const res = await fetchTags();
      setTags(res.data.data)
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  }
  
  useEffect(() => {
    if (SearchItem.trim() === '') {
      loadBook().then((res) => {
        if (res) {
          const tags = res.data.data.tags;
          setCategoryTags(tags);
        }
      });
      loadTags();
    } else {
      Search();
    }
  }, [Page, PageSize, Total])

  const totalPages = Math.ceil(Total / PageSize); // Calculate total pages

  const handleSearchClick = async () => {
    if (SearchItem.trim() === '') {
      setShowAlert(true);
      fetchBooks(Page, PageSize);
      return;
    }
    //reset the current page
    await setPage(1);
    Search();
  };

  const Search = async () => {
    try {
      const res = await searchBooks(Page, PageSize, SearchItem)
      if (res.data.data === "There is no result") {
        setNoResult(true)
      } else {
        const Total = res.data.data.total; //total records
        setTotal(Total)
        setData({ books: res.data.data.rows })
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  //when click the BulkDelete button
  const handleBulkDelete = () => {
    if (selectedBooks.size === 0) {
      // No books selected
      setNoSelect(true)
      return
    }
    openModal("BulkDelete")
  }

  //delete the chosen books
  const DeleteBooks = (bookIds: number[] | Set<number>) => {
    const booksIds = Array.from(bookIds);
    deleteBooks(booksIds);
    try {
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleted:", error);
    }
    setData(prevBooks => {
      if (!prevBooks) return null;
      return {
        ...prevBooks, // keep previous books
        books: prevBooks.books.filter(book => !Array.from(bookIds).includes(book.bookId))
      };
    });
  }

  //when adding the tags
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, tag: string) => {
    if (e.target.checked) {
      setSelectedTags((prevTags) => [...prevTags, tag])
    } else {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
  }

  //when adding a new book
  const AddnewBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const allEmpty = {
      title: Books.title.trim() === '',
      author: Books.author.trim() === '',
      description: Books.description.trim() === '',
      quantity: Books.quantity === null,
      cover: !Img
    };
    setEmptyInput(allEmpty);

    if (Object.values(allEmpty).every(value => !value)) {
      const newBookData: bookData = {
        title: Books.title,
        author: Books.author,
        description: Books.description,
        quantity: Books.quantity,
      }

      const data = await addBooks(newBookData, Img, selectedTags);
      if (data === 0) {
        // books name already exist
        setEmptyInput({ ...EmptyInput, title: true })
        setBookExist(true);
      } else {
        setBookExist(false);

        setCategoryTags(prevCategoryTags => [...prevCategoryTags, selectedTags]);

        const newData: Book = {
          ...data,
          Tags: [selectedTags]
        };

        setData(prevBooks => {
          const updatedBooks = prevBooks ? [...prevBooks.books, newData] : [newData];

          setTotal(updatedBooks.length);
          return {
            ...prevBooks,
            books: updatedBooks
          };
        });
        setAddSuccess(true);

        setBooks({
          title: "",
          author: "",
          description: "",
          quantity: ""
        })
        setSelectedTags([]);
        setImg(null);
        const fileInput = document.getElementById("coverInput") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }

        closeDialog("addNewBook");
      }

    }
  }

  //when click cancel button
  const handleClose = () => {
    setBooks({
      title: "",
      author: "",
      description: "",
      quantity: "",
    });
    setSelectedTags([]);
    setImg(null);
    setEmptyInput({
      title: false,
      author: false,
      description: false,
      quantity: false,
      cover: false
    })
    const fileInput = document.getElementById("coverInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    closeDialog("addNewBook")
  }

  // when haven get the data
  if (!Data) {
    return <span className="loading loading-spinner loading-2xl"></span>;
  }

  //when opening edit box
  const openEditModal = (mode: string,
    title: string, author: string, description: string, quantity: number,
    selectedTags: string[]
  ) => {
    const modal = document.getElementById(mode) as HTMLDialogElement;
    setBooks({
      title: title,
      author: author,
      description: description,
      quantity: quantity
    });
    setSelectedTags(selectedTags);
    modal?.showModal();
  }

  //when submit edited contents
  const editBook = async (e: React.FormEvent, mode: string, bookId: number,) => {
    e.preventDefault();
    const allEempty = {
      title: Books.title.trim() === '',
      author: Books.author.trim() === '',
      description: Books.description.trim() === '',
      quantity: Books.quantity === null,
      cover: false
    };
    setEmptyInput(allEempty);

    if (Object.values(allEempty).every(value => !value)) {
      const editBook: EditbookType = {
        bookId: bookId,
        title: Books.title,
        author: Books.author,
        description: Books.description,
        quantity: Books.quantity
      };

      const data = await editThisBook(editBook, Img, selectedTags);

      setCategoryTags((prevCategoryTags) => {
        const updatedTags = [...prevCategoryTags];

        const bookIndex = Data.books.findIndex((book) => book.bookId === bookId);

        if (bookIndex !== -1) {
          updatedTags[bookIndex] = selectedTags;
        } else {
          console.warn(`Book with ID ${bookId} not found.`);
        }
        return updatedTags;
      });

      const updatedBook: Book = {
        ...data,
        Tags: [selectedTags]
      };

      setData((prevBooks) => {
        if (prevBooks) {
          const updatedBooks = prevBooks.books.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
          );
          return {
            ...prevBooks,
            books: updatedBooks
          };
        }

        return {
          books: [updatedBook] // 如果没有现有书籍，则初始化数据
        };
      });

      setAddSuccess(true);
      setBooks({
        title: "",
        author: "",
        description: "",
        quantity: ""
      });
      setSelectedTags([]);
      setImg(null);
      const fileInput = document.getElementById("coverInput") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      closeDialog(mode);
    }
  }

  //when already get the data
  return (
    <div className="p-4">

      {/* when search for an empty item */}
      {showAlert && <Alert content="Search input cannot be empty" alertType="alert-error" onClose={() => setShowAlert(false)} />}
      {/* when search result no found */}
      {noResult && <Alert content="There is no result" alertType="alert-error" onClose={() => setNoResult(false)} />}
      {/* when bulk deleting but no books chosen */}
      {noSelect && <Alert content="Please select at least one book" alertType="alert-error" onClose={() => setNoSelect(false)} />}
      {/* when delete books/ a book successfully */}
      {deleteSuccess && <Alert content="Delete successfully" alertType="alert-success" onClose={() => setDeleteSuccess(false)} />}
      {addSuccess && <Alert content="Add a new book successfully" alertType="alert-success" onClose={() => setAddSuccess(false)} />}

      <h1 className="text-4xl font-bold mb-5">Books Management</h1>
      <div className="flex justify-between space-x-2 mb-4">

        {/* show books perpage */}
        <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

        {/* Add new book */}
        <button className="btn btn-accent" onClick={() => openModal("addNewBook")}>Add New Book</button>

        {/* Search bar */}
        <div className='flex items-center space-x-2'>
          <input
            type="text"
            placeholder="Search any keyword"
            value={SearchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="input input-bordered input-info w-full max-w-xs" />
          <button
            onClick={() => handleSearchClick()}
            className="btn btn-primary ">Search</button>
        </div>

        {/* Bulk Delete button */}
        <button
          onClick={handleBulkDelete}
          className="btn btn-secondary">Bulk Delete</button>

        <Reminder id="BulkDelete"
          title="Are you sure you want to delete?"
          content="After you delete these books, you can not view them again"
          onClick={() => DeleteBooks(selectedBooks)} />
      </div>

      {/* Table with all the books */}
      <table className="table table-zebra w-full table-fixed">
        <TableHeader headers={BooksTableHeaders} showCheckbox={true}
          isAllSelected={isAllSelected} handleSelectAll={handleSelectAll} />
        <tbody>
          {Data.books.map((book, index) => (
            <tr key={book.bookId}>
              <th className="w-16">
                <label>
                  <input type="checkbox"
                    className="checkbox border-2 border-gray-500"
                    checked={selectedBooks.has(book.bookId)}
                    onChange={() => { handleSelectItem(book.bookId) }} />
                </label>
              </th>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={book.title}>{book.title}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={book.author}>{book.author}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                {CategoryTags[index].map((tag, subIndex) => (
                  <span key={subIndex}>
                    {tag}
                    {subIndex !== CategoryTags[index].length - 1 && ', '}
                  </span>
                ))}
              </td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={book.description}>{book.description}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center">{book.quantity}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="mask mask-squircle h-12 w-12"><img src={book.cover} /></div></td>
              <td>
                <button
                  onClick={() => openEditModal(`Edit-${book.bookId}`, book.title, book.author, book.description, book.quantity, CategoryTags[index])}
                  className="btn btn-outline btn-success mr-3">Edit</button>

                {/* when editing the book */}
                <dialog id={`Edit-${book.bookId}`} className="modal">
                  <div className="modal-box space-y-4">
                    <h3 className="font-bold text-lg">Edit the Book</h3>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Book's Title</span>
                      <input type="text" placeholder="One Hundred Years of Solitude"
                        value={Books.title}
                        onChange={(e) => { setBooks({ ...Books, title: e.target.value }); setBookExist(false) }}
                        onClick={() => { setEmptyInput({ ...EmptyInput, title: false }); setBookExist(false) }}
                        className="input input-bordered" />
                      <span className={`text-red-700 text-sm ${EmptyInput.title ? 'visible' : 'invisible'}`}>
                        {BookExist ? "Book's name is already exist" : "Please enter the book's title"}
                      </span>
                    </label>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Author</span>
                      <input type="text" placeholder="Gabriel García Márquez"
                        value={Books.author}
                        onChange={(e) => setBooks({ ...Books, author: e.target.value })}
                        onClick={() => setEmptyInput({ ...EmptyInput, author: false })}
                        className="input input-bordered" />
                      <span className={`text-red-700 text-sm ${EmptyInput.author ? 'visible' : 'invisible'}`}>
                        Please enter the author
                      </span>
                    </label>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Description</span>
                      <textarea
                        value={Books.description}
                        onChange={(e) => setBooks({ ...Books, description: e.target.value })}
                        onClick={() => setEmptyInput({ ...EmptyInput, description: false })}
                        className="textarea textarea-bordered h-96 resize-none "
                        placeholder="One Hundred Years of Solitude is the story..."></textarea>
                      <span className={`text-red-700 text-sm ${EmptyInput.description ? 'visible' : 'invisible'}`}>
                        Please enter the description
                      </span>
                    </label>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Tags</span>
                      {Tags.map((tag, index) => (
                        <label className="cursor-pointer label" key={index}>
                          <span className="label-text">{tag}</span>
                          <input type="checkbox"
                            id={`checkbox-${tag}`}
                            checked={selectedTags.includes(tag)}
                            onChange={(e) => handleCheckboxChange(e, tag)}
                            className="checkbox checkbox-info" />
                        </label>
                      ))}
                    </label>
                    <label className="form-control">
                      <span className="label-text mb-2 text-md">Quantity</span>
                      <input type="text" placeholder="50"
                        value={Books.quantity}
                        onChange={(e) => setBooks({ ...Books, quantity: Number(e.target.value) })}
                        onClick={() => setEmptyInput({ ...EmptyInput, quantity: false })}
                        className="input input-bordered" />
                      <span className={`text-red-700 text-sm ${EmptyInput.quantity ? 'visible' : 'invisible'}`}>
                        Please enter at least a number bigger than one
                      </span>
                    </label>
                    <label className="label flex items-center gap-2">
                      Cover Page
                      <input type="file" className="grow file-input" id='coverInput'
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          setImg(file)
                        }}
                        accept='.jpg,.png,.jpeg' />
                    </label>
                    <span>Current Cover: {book.cover}</span>
                    <div className="modal-action">
                      <form method="dialog">
                        <button
                          onClick={(e) => editBook(e, `Edit-${book.bookId}`, book.bookId)}
                          className="btn">Comfirm</button>
                        <button className="btn ml-5" onClick={handleClose}>Cancel</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  onClick={() => openModal(`DeleteBook-${book.bookId}`)}
                  className="btn btn-outline btn-error">Delete</button>

                <Reminder id={`DeleteBook-${book.bookId}`}
                  title="Are you sure you want to delete?"
                  content="After you delete this book, you can not view it anymore"
                  onClick={() => DeleteBooks([book.bookId])} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination Page={Page} totalPages={totalPages} setPage={setPage} changePage={changePage} />

      {/* add a new Book */}
      <dialog id="addNewBook" className="modal">
        <div className="modal-box space-y-4">
          <h3 className="font-bold text-lg">Add a New Book</h3>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Book's Title</span>
            <input type="text" placeholder="One Hundred Years of Solitude"
              value={Books.title}
              onChange={(e) => { setBooks({ ...Books, title: e.target.value }); setBookExist(false) }}
              onClick={() => { setEmptyInput({ ...EmptyInput, title: false }); setBookExist(false) }}
              className="input input-bordered" />
            <span className={`text-red-700 text-sm ${EmptyInput.title ? 'visible' : 'invisible'}`}>
              {BookExist ? "Book's name is already exist" : "Please enter the book's title"}
            </span>
          </label>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Author</span>
            <input type="text" placeholder="Gabriel García Márquez"
              value={Books.author}
              onChange={(e) => setBooks({ ...Books, author: e.target.value })}
              onClick={() => setEmptyInput({ ...EmptyInput, author: false })}
              className="input input-bordered" />
            <span className={`text-red-700 text-sm ${EmptyInput.author ? 'visible' : 'invisible'}`}>
              Please enter the author
            </span>
          </label>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Description</span>
            <textarea
              value={Books.description}
              onChange={(e) => setBooks({ ...Books, description: e.target.value })}
              onClick={() => setEmptyInput({ ...EmptyInput, description: false })}
              className="textarea textarea-bordered h-96 resize-none "
              placeholder="One Hundred Years of Solitude is the story..."></textarea>
            <span className={`text-red-700 text-sm ${EmptyInput.description ? 'visible' : 'invisible'}`}>
              Please enter the description
            </span>
          </label>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Tags</span>
            {Tags.map((tag, index) => (
              <label className="cursor-pointer label" key={index}>
                <span className="label-text">{tag}</span>
                <input type="checkbox"
                  id={`checkbox-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => handleCheckboxChange(e, tag)}
                  className="checkbox checkbox-info" />
              </label>
            ))}
          </label>
          <label className="form-control">
            <span className="label-text mb-2 text-md">Quantity</span>
            <input type="text" placeholder="50"
              value={Books.quantity}
              onChange={(e) => setBooks({ ...Books, quantity: Number(e.target.value) })}
              onClick={() => setEmptyInput({ ...EmptyInput, quantity: false })}
              className="input input-bordered" />
            <span className={`text-red-700 text-sm ${EmptyInput.quantity ? 'visible' : 'invisible'}`}>
              Please enter at least a number bigger than one
            </span>
          </label>
          <label className="label flex items-center gap-2">
            Cover Page
            <input type="file" className="grow file-input" id='coverInput'

              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setImg(file)
              }}
              onClick={() => setEmptyInput({ ...EmptyInput, cover: false })}
              accept='.jpg,.png,.jpeg' />
          </label>
          <span className={`text-red-700 text-sm ${EmptyInput.cover ? 'visible' : 'invisible'}`}>
            Please select the book's cover page
          </span>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={(e) => AddnewBook(e)}
                className="btn">Comfirm</button>
              <button className="btn ml-5" onClick={handleClose}>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookManage;
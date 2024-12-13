import { useEffect, useState } from 'react';
import { BookRoot } from '@/types/book';
import Alert from '@/components/Alert';
import Reminder from '@/components/reminder';
import { openModal } from '@/utils/uiInteract';
import { deleteBooks, fetchBooks, searchBooks } from '@/service/bookService';
import Pagination from "@/components/Pagination"
import TableHeader from '@/components/tableHeader';
import { BooksTableHeaders } from '@/assets/staticData';
import useSelection from '@/hooks/useSelection';
import RecordsPerPage from '@/components/RecordsPerPage';
import usePage from '@/hooks/usePage';

const BookManage = () => {
  const [Data, setData] = useState<BookRoot | null>(null); // all the books info
  const { Page, setPage, PageSize, setPageSize, Total, setTotal } = usePage();

  const [SearchItem, setSearchItem] = useState<string>(""); //set search Item
  const [showAlert, setShowAlert] = useState<boolean>(false); //set alert visible
  const [prevSearchItem, setPrevSearchItem] = useState<string>(""); //check prevSearchItem
  const [noResult, setNoResult] = useState<Boolean>(false); //show no result found

  const [noSelect, setNoSelect] = useState<Boolean>(false); //show no selected books to delete
  const [deleteSuccess, setDeleteSuccess] = useState<Boolean>(false); //


  useEffect(() => {
    if (SearchItem.trim() === '' && prevSearchItem.trim() !== '') {
      // when the search bar become empty,then reload all the books data
      fetchBooks(Page, PageSize, setTotal, setData);
    }
    setPrevSearchItem(SearchItem);
  }, [SearchItem]);

  useEffect(() => {
    if (SearchItem.trim() === '') {
      fetchBooks(Page, PageSize, setTotal, setData);
    } else {
      Search();
    }
  }, [Page, PageSize, Total])

  const totalPages = Math.ceil(Total / PageSize); // Calculate total pages

  const handleSearchClick = async () => {
    if (SearchItem.trim() === '') {
      setShowAlert(true);
      fetchBooks(Page, PageSize, setTotal, setData);
      return;
    }
    //reset the current page
    await setPage(1);
    Search();
  };

  const Search = () => {
    try {
      searchBooks(Page, PageSize, SearchItem, setNoResult, setTotal, setData)
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const {
    selectedItems: selectedBooks, // 已选择的书籍
    handleSelectAll, // 全选/取消全选处理函数
    handleSelectItem, // 单个选择/取消选择处理函数
    isAllSelected, // 是否已经全选
    changePage
  } = useSelection(
    Data?.books || [], // 数据源
    (book) => book.bookId // 唯一标识函数
  );

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
    const booksIds = Array.from(bookIds).join(',');
    deleteBooks(bookIds)
    console.log(booksIds)
    try {
      setDeleteSuccess(true)
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

  // when haven get the data
  if (!Data) {
    return <span className="loading loading-spinner loading-2xl"></span>;
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

      <h1 className="text-4xl font-bold mb-5">Books Management</h1>
      <div className="flex justify-between space-x-2 mb-4">

        {/* show books perpage */}
        <RecordsPerPage PageSize={PageSize} Total={Total} setPageSize={setPageSize} />

        {/* Add new book */}
        <button className="btn btn-accent" onClick={() => openModal("addNewBook")}>Add New Book</button>

        <dialog id="addNewBook" className="modal">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">Add a New Book</h3>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Book's Title</span>
              <input type="text" placeholder="One Hundred Years of Solitude" className="input input-bordered" />
            </label>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Author</span>
              <input type="text" placeholder="Gabriel García Márquez" className="input input-bordered" />
            </label>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Description</span>
              <textarea className="textarea textarea-bordered h-96 resize-none "
                placeholder="One Hundred Years of Solitude is the story..."></textarea>
            </label>
            <label className="form-control">
              <span className="label-text mb-2 text-md">Quantity</span>
              <input type="text" placeholder="50" className="input input-bordered" />
            </label>
            <label className="label flex items-center gap-2">
              Upload Cover Page
              <input type="file" className="grow file-input" />
            </label>

            <div className="modal-action">
              <form method="dialog">
                <button
                  // onClick={Logout}
                  className="btn">Comfirm</button>
                <button className="btn ml-5">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>

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
          {Data.books.map((book) => (
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
              <td className="overflow-hidden text-ellipsis whitespace-nowrap">Category</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap" title={book.description}>{book.description}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center">{book.quantity}</td>
              <td className="overflow-hidden text-ellipsis whitespace-nowrap">{book.cover}</td>
              <td>
                <button className="btn btn-outline btn-info mr-3">View</button>
                <button className="btn btn-outline btn-success mr-3">Edit</button>
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
    </div>
  );
};

export default BookManage;
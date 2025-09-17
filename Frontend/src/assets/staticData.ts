import user from "@/assets/users.png"
import book from "@/assets/books.jpg"
import appointment from "@/assets/appointment.png"
import bookCategories from "@/assets/bookCategories.jpg"
import { cardItem, menuItem, tableheader } from "@/types/staticData"

//The Card List in the Dashboard
export const CardList: cardItem[] = [
  {
    link: user,
    key: "/usermanage",
    title: 'User Management',
    content: "Easily manage readers' information, borrowing records and reservations, and realize intelligent user services.",
  }, {
    key: "/bookmanage",
    link: book,
    title: 'Book Management',
    content: "Efficient Statistics: Real-time data analysis to facilitate decision-making and optimize library operations.",
  }, {
    key: "/categories",
    link: bookCategories,
    title: 'Caterogies',
    content: "Easily manage book categorization so that every book is in the right place, opening up an efficient reading experience!",
  }, {
    key: "/borrowing",
    link: appointment,
    title: 'Borrowing Records',
    content: "Borrowing at your fingertips, record with your book journey - enjoy the efficient and convenient borrowing record module!",
  },
]

//Menu List in the leftSide
export const menuList: menuItem[] = [
  {
    label: "Dashboard",
    key: '',
    icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  },
  {
    label: "Users Management",
    key: "/usermanage",
    icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
  },
  {
    label: "Books Management",
    key: "/bookmanage",
    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
  },
  {
    label: "Categories",
    key: "/categories",
    icon: "M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
  },
  {
    label: "Borrowing Records",
    key: "/borrowing",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  },
]

//Books table header
export const BooksTableHeaders: tableheader[] = [
  {
    title: "Book's Name",
    width: "w-1/6"
  },
  {
    title: "Author",
    width: "w-1/12"
  },
  {
    title: "Category ",
    width: "w-1/6 "
  },
  {
    title: "Description",
    width: "w-1/6 "
  },
  {
    title: "Quantity",
    width: "w-1/12 text-center"
  },
  {
    title: "Cover Page",
    width: "w-1/12 text-center"
  },
  {
    title: "Operations",
    width: "w-1/"
  },
]

//Categories table header
export const CaterogiesHeaders: tableheader[] = [
  {
    title: "Categories",
    width: "w-2/12 text-center"
  },
  {
    title: "Description",
    width: "w-7/12"
  },
  {
    title: "Total Type of Books",
    width: "w-1/6 "
  },
  {
    title: "Operations",
    width: "w-1/6 "
  }
]

export const UsersHeaders: tableheader[] = [
  {
    title: "Avatar",
    width: "w-1/4"
  },
  {
    title: "Username",
    width: "w-1/4"
  },
  {
    title: "Name",
    width: "w-1/4"
  },
  {
    title: "Email",
    width: "w-1/4 "
  }
]

export const BorrowRecordHeader: tableheader[] = [
  {
    title: "Record ID",
    width: "w-1/6"
  },
  {
    title: "Username",
    width: "w-1/6"
  },
  {
    title: "Book Name",
    width: "w-1/6"
  },
  {
    title: "Borrow Date",
    width: "w-1/6"
  },
  {
    title: "Due Date",
    width: "w-1/6"
  },
  {
    title: "Return Date",
    width: "w-1/6"
  },
  {
    title: "Status",
    width: "w-1/6"
  },
  {
    title: "Operation",
    width: "w-1/6"
  },
]

export const userMenu: menuItem[] = [
  {
    label: "Home",
    key: "",
    icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  },
  {
    label: "Borrow",
    key: "/myBorrow",
    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
  },
  {
    label: "My Info",
    key: "/myInfo",
    icon: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  },
]
import { Book, bookData, EditbookType } from "@/types/book";
import { http } from "@/utils";

//load the books data
export const fetchBooks = async (
    Page: number, PageSize: number,
    setTotal: (Total: number) => void,
    setData: (data: { books: Book[] }) => void,
) => {
    try {
        const res = await http.get("/api/booksData", {
            params: {
                page: Page,
                pageSize: PageSize
            }
        });
        console.log("kanwo:", res.data.data.tags)

        const Total = res.data.data.total; //total records

        setTotal(Total)
        setData({ books: res.data.data.rows })
        return res.data.data.tags
    } catch (error) {
        console.error("Error fetching books data:", error);
    }
};

export const searchBooks = async (
    Page: number, PageSize: number, SearchItem: string,
    setNoResult: (noResult: boolean) => void,
    setTotal: (Total: number) => void,
    setData: (data: { books: Book[] }) => void
) => {
    const res = await http.get("/api/search", {
        params: {
            page: Page,
            pageSize: PageSize,
            SearchItem: SearchItem
        }
    });
    console.log(res.data.data)
    if (res.data.data === "There is no result") {
        setNoResult(true)
    } else {
        const Total = res.data.data.total; //total records
        setTotal(Total)
        setData({ books: res.data.data.rows })
    }
}

export const deleteBooks = async (bookIds: number[] | Set<number>) => {
    try {
        await http.delete(`/api/deleteBooks/${bookIds}`);
    } catch (error) {
        console.error("Error deleting books:", error);
        throw error;
    }
}

// get all the categories
export const fetchTags = async (
    setTag: (tags: string[]) => void
) => {
    try {
        const res = await http.get("/api/fetchTags")
        console.log(res.data.data)

        setTag(res.data.data)
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
}

export const addBooks = async (Book: bookData, Img: File | null, Tags: string[]) => {
    const formData = new FormData();
    formData.append('title', Book.title);
    formData.append('author', Book.author);
    formData.append('description', Book.description);
    formData.append('quantity', Book.quantity.toString());
    if (Img) {
        formData.append('file', Img);
    }
    Tags.forEach(tag => formData.append("tags", tag));
    try {
        const res = await http.put("/api/addBook", formData);
        if (res.data.code === 0) {
            return 0;
        }
        // console.log(res.data.data)
        return res.data.data;
    } catch (error) {
        console.error("Error adding BOOK:", error);
        throw error;
    }
}

//edit the book
export const editThisBook = async (Book: EditbookType, Img: File | null, Tags: string[]) => {
    const formData = new FormData();
    formData.append('id', Book.bookId.toString());
    formData.append('title', Book.title);
    formData.append('author', Book.author);
    formData.append('description', Book.description);
    formData.append('quantity', Book.quantity.toString());
    if (Img) {
        formData.append('file', Img);
    }
    Tags.forEach(tag => formData.append("tags", tag));

    try {
        const res = await http.post("/api/editBook", formData);
        console.log(res.data.data)
        return res.data.data;
    } catch (error) {
        console.error("Error editing BOOK:", error);
        throw error;
    }
};

export const fetchRecommend = async (setBooks: (data: { books: Book[] }) => void) => {
    try {
        const res = await http.get("/api/recommendBook");
        setBooks({ books: res.data.data });
    } catch (error) {
        console.error("Error fetching books data:", error);
    }
}

export const getTagsById = async (bookId: number, setTag: (tags: string[]) => void) => {
    try {
        const res = await http.get("/api/getTagsById", {
            params: { bookId: bookId }
        });
        setTag(res.data.data);
    } catch (error) {
        console.error("Error fetching books data:", error);
    }
}

export const isBorrow = async (
    username: string, bookName: string,
    setisBorrow: (isBorrow: boolean) => void) => {
    try {
        const res = await http.get("/api/isborrow", {
            params: {
                username: username,
                bookName: bookName
            }
        });
        console.log(res.data)
        if (res.data.data === null) {
            setisBorrow(false);
        } else {
            setisBorrow(true);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export const borrowOrReturnBook = async (
    bookName: string, username: string,
    setQuantity: React.Dispatch<React.SetStateAction<number>>,
    setisBorrow: (isBorrow: boolean) => void
) => {
    try {
        const res = await http.get("/api/borrowBook", {
            params: {
                username: username,
                bookName: bookName
            }
        });
        console.log(res.data.data)
        setQuantity((prev) => (res.data.data === "Borrow" ? prev - 1 : prev + 1));
        setisBorrow(res.data.data === "Borrow");
    } catch (error) {
        console.error("Error borrowing book:", error);
    }
}

export const searchForBook = async (keyword: string, setBooks: (data: { books: Book[] }) => void) => {
    try {
        const res = await http.get("/api/searchForBook", {
            params: {
                keyword: keyword
            }
        });
        // console.log(res.data.data)
        setBooks({ books: res.data.data });
    } catch (error) {
        console.error("Error searching book:", error);
    }
}
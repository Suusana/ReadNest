import { bookData, EditbookType } from "@/types/book";
import { http } from "@/utils";

//load the books data
export const fetchBooks = async (Page: number, PageSize: number,) => {
    return await http.get("/api/booksData", {
        params: {
            page: Page,
            pageSize: PageSize
        }
    })
};

//search books
export const searchBooks = async (Page: number, PageSize: number, SearchItem: string,) => {
    return await http.get("/api/search", {
        params: {
            page: Page,
            pageSize: PageSize,
            SearchItem: SearchItem
        }
    });
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
export const fetchTags = async () => {
    return await http.get("/api/fetchTags")
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

export const fetchRecommend = async () => {
    return await http.get("/api/recommendBook");
}

export const getTagsById = async (bookId: number) => {
    return await http.get("/api/getTagsById", {
        params: { bookId: bookId }
    });

}

export const isBorrow = async (username: string, bookName: string) => {
    return await http.get("/api/isborrow", {
        params: {
            username: username,
            bookName: bookName
        }
    });
}

export const borrowOrReturnBook = async (bookName: string, username: string) => {
    return await http.get("/api/borrowBook", {
        params: {
            username: username,
            bookName: bookName
        }
    });
}

export const searchForBook = async (keyword: string) => {
    return await http.get("/api/searchForBook", {
        params: {
            keyword: keyword
        }
    });
}
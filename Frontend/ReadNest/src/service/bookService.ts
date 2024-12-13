import { Book } from "@/types/book";
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
        console.log(res.data.data.rows)

        const Total = res.data.data.total; //total records

        setTotal(Total)
        setData({ books: res.data.data.rows })
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
        await http.delete(`/api/deleteBooks/${bookIds}`)
    } catch (error) {
        console.error("Error deleting books:", error);
        throw error;
    }
}
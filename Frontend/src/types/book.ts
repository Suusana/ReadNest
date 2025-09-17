export interface Book {
    bookId: number;
    title: string;
    author: string;
    Tags: string[];
    description: string;
    quantity: number;
    cover: string;
}

// the root state
export interface BookRoot {
    books: Book[]
}

//when add a new book
export interface bookData {
    title: string;
    author: string;
    description: string;
    quantity: number | "";
}

//when editing book
export interface EditbookType {
    bookId: number;
    title: string;
    author: string;
    description: string;
    quantity: number | "";
}
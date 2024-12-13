export interface Book {
    bookId: number,
    title: string,
    author: string
    description: string
    quantity: number
    cover: string
}

// the root state
export interface BookRoot {
    books: Book[]
}
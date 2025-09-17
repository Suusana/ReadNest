export interface Category {
    categoryId: number,
    category: string,
    description: string,
    totalBooks: number
}
// the root state
export interface CategoryRoot {
    categories: Category[]
}

export interface CategoryType {
    category: string,
    description: string
}


export interface Category {
    categoryId: number,
    category: string,
    description: string
}

export interface CategoryType {
    category: string,
    description: string
}

// the root state
export interface CategoryRoot {
    categories: Category[]
}
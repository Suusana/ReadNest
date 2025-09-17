import { Category, CategoryType } from "@/types/categories";
import { http } from "@/utils";

export const fetchCategories = async (Page: number, PageSize: number,) => {
    return await http.get("/api/categoriesData", {
        params: {
            page: Page,
            pageSize: PageSize
        }
    });
};

export const DeleteCategory = async (categoryIds: number[]) => {
    const categoriesIds = Array.from(categoryIds).join(',');
    await http.delete(`/api/deleteCategory/${categoriesIds}`);
};

export const addCategory = async (category: CategoryType) => {
    try {
        const res = await http.put("/api/addCategory", category);
        if (res.data.code === 0) {
            return 0
        }
        return res.data.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const editCategory = async (category: Category) => {
    try {
        const res = await http.put("/api/editCategory", category);
        return res.data.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};


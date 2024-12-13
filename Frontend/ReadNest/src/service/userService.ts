import { UserType } from "@/types/user";
import { http } from "@/utils";

export const fetchUsers = async (
    Page: number, PageSize: number,
) => {
    try {
        const res = await http.get("/api/usersData", {
            params: {
                page: Page,
                pageSize: PageSize
            }
        });
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Error fetching users data:", error);
    }
};
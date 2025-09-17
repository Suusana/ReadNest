import { http } from "@/utils";

export const fetchUsers = async (Page: number, PageSize: number,) => {
    return await http.get("/api/usersData", {
        params: {
            page: Page,
            pageSize: PageSize
        }
    });
};

export const uploadAvatar = async (Img: File, userId: string) => {
    const formData = new FormData();
    formData.append("avatar", Img);
    formData.append("userId", userId);
    return await http.post('/api/uploadAvatar', formData);
}

export const updatePassword = async (password: string, userId: string) => {
    return await http.post('/api/changePsw', {
        password: password,
        userId: userId
    });
}

export const fetchUserRecords = async (username: string) => {
    const res = await http.get('/api/fetchUserRecords', { params: { username } });
    return { userRecords: res.data.data };
}

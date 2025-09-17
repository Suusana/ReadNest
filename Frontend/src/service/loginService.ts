import { http } from "@/utils";

//Login
export const LoginFun = async (email: string, password: string) => {
    return await http.post("/api/login", {
        email, password
    });
}

//Register
export const RegisterFun = async (formData: any) => {
    return await http.post("/api/register", formData);
}

import { setToken, setUser } from "@/store/user";
import { http } from "@/utils";

//Login

export const LoginFun = async (
    email: string, password: string, dispatch: any, setMsg: (msg: string) => void, navigate: any) => {
    const res = await http.post("/api/login", {
        email, password
    });

    if (res.data.code === 1) {
        // success
        const token = res.data.data.jwt;
        const user = res.data.data.user;

        dispatch(setToken(token))
        dispatch(setUser(user))
        if (res.data.data.user.username === "Admin") {
            // jump to admin page
            navigate("/admin");
        } else {
            navigate("/home")
        }
    } else {
        const message = res.data.message
        setMsg(message);
    }
    console.log(res.data.message);
}

export const RegisterFun = async (formData: any, setMsg: (msg: string) => void, dispatch: any, navigate: any) => {
    const res = await http.post("/api/register", formData);
    console.log(formData)
    if (res.data.code === 0) {
        // username sxist
        setMsg(res.data.message)
    } else {
        //success, login automatically
        const token = res.data.data.jwt;
        const user = res.data.data.user;
        dispatch(setToken(token))
        dispatch(setUser(user))
        navigate("/home")
    }
    console.log()
}

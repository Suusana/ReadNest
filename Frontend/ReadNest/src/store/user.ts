// user status management

import { createSlice } from "@reduxjs/toolkit";
import { setToken as settoken, getToken, getUser, setUser as setuser, removeUser ,removeToken} from "@/utils"

const initialUser = getUser();

const userState = createSlice({
    name: "user",
    initialState: {
        token: getToken() || '',
        userId: initialUser?.userId || "",
        username: initialUser?.username || "",
        name: initialUser?.name || "",
        email: initialUser?.email || "",
        password: initialUser?.password || "",
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            settoken(action.payload)
        }, setUser(state, action) {
            const { userId, username, name, email, password } = action.payload;
            state.userId = userId;
            state.username = username;
            state.name = name;
            state.email = email;
            state.password = password;
            setuser(action.payload)
        }, clearUserInfo(state) {
            state.token = '';
            state.userId = '';
            state.username = '';
            state.name = '';
            state.email = '';
            state.password = '';
            removeUser();
            removeToken();
        }
    }
})


const { setToken, setUser ,clearUserInfo} = userState.actions
const userReducer = userState.reducer

export { setToken, setUser ,clearUserInfo}
export default userReducer
import { AuthState } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword:"",
    },
    reducers: {
        Register(
            state,
            action: PayloadAction<{ field: keyof AuthState; value: string }>
        ) {
            const { field, value } = action.payload;
            state[field] = value;
        }
    }
});

const { Register } = authSlice.actions;
const authReducer = authSlice.reducer

export { Register };
export default authReducer;

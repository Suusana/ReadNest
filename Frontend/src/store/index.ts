import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});
export default store;

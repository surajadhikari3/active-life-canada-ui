import { configureStore } from "@reduxjs/toolkit";
import loginFormSlice from "../redux/loginFormSlice.jsx";
import signUpFormSlice from "../redux/signUpFormSlice.jsx";
import login2FAFormSlice from "../redux/login2FAFormSlice.jsx";

const store = configureStore({
    reducer: {
        signUpForm: signUpFormSlice,
        loginForm: loginFormSlice,
        login2FAForm: login2FAFormSlice
    },
});

export default store;
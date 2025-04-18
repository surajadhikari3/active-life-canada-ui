import { configureStore } from "@reduxjs/toolkit";
import loginFormSlice from "../redux/loginFormSlice.jsx";
import signUpFormSlice from "../redux/signUpFormSlice.jsx";
import login2FAFormSlice from "../redux/login2FAFormSlice.jsx";
import authenticationSlice from "../redux/authenticationSlice.jsx";
import cartSlice from "../redux/cartSlice.jsx";

const store = configureStore({
    reducer: {
        signUpForm: signUpFormSlice,
        loginForm: loginFormSlice,
        login2FAForm: login2FAFormSlice,
        authentication: authenticationSlice,
        cart: cartSlice
    },
});

export default store;
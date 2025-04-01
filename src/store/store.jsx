import { configureStore } from "@reduxjs/toolkit";
import formSlice from "../redux/formSlice"

const store = configureStore({
    reducer: {
        form: formSlice
    },
});

export default store;
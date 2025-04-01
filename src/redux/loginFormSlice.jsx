import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    familyMemberId: "",
    familyPin: "",
};

const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload }; // Merge new form data
        },
        resetForm: () => initialState, // Reset form data
    },
});

export const { updateFormData, resetForm } = loginFormSlice.actions;

export default loginFormSlice.reducer;

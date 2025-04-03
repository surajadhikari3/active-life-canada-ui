import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    familyMemberId: "",
    otp: "",
};

const login2FAFormSlice = createSlice({
    name: "login2FAForm",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetForm: () => initialState,
    },
});

export const { updateFormData, resetForm } = login2FAFormSlice.actions;

export default login2FAFormSlice.reducer;

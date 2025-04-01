import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    familyMemberId: "",
    otp: "",
};

const login2FAFormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload }; // Merge new form data
        },
        resetForm: () => initialState, // Reset form data
    },
});

export const { updateFormData, resetForm } = login2FAFormSlice.actions;

export default login2FAFormSlice.reducer;

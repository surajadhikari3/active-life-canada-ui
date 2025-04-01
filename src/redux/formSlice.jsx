import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    familyPin: "",
    city: "",
    email: "",
    homePhone: "",
    preferredContact: "",
};


const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload }; // Merge new form data
        },
        resetForm: () => initialState, // Reset form data
    },
});

export const { updateFormData, resetForm } = formSlice.actions;

export default formSlice.reducer;

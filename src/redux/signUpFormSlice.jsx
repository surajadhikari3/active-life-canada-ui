import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    familyPin: "",
    city: "",
    email: "",
    homePhone: "",
    preferredContact: "",
};

const signUpFormSlice = createSlice({
    name: "registrationForm",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload }; // Merge new form data
        },
        resetForm: () => initialState, // Reset form data
    },
});

export const { updateFormData, resetForm } = signUpFormSlice.actions;

export default signUpFormSlice.reducer;

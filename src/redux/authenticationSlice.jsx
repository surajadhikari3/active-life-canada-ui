import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    memberLoginId: null,
    isActive: false
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        updateAuthenticationStatus: (state, action) => {
            return {...state, ...action.payload}; // Merge new form data
        },
        resetAuthenticationStatus: () => initialState, // Reset the state
    },
});

export const {updateAuthenticationStatus, resetAuthenticationStatus} = authenticationSlice.actions;

export default authenticationSlice.reducer;

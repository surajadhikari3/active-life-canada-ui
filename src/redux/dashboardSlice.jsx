import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    memberLoginId: null,
    isActive: false,
    familyGroup: null
};

const authenticationSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        updateAuthenticationStatus: (state, action) => {
            state.memberLoginId = action.payload.memberLoginId
            state.isActive = action.payload.isActive
        },
        resetAuthenticationStatus: () => initialState, // Reset the state

        updateFamilyGroup: (state, action) => {
                state.familyGroup = action.payload
        }
    },
});

export const {updateAuthenticationStatus, resetAuthenticationStatus} = authenticationSlice.actions;

export default authenticationSlice.reducer;

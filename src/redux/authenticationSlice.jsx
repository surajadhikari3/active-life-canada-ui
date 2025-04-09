import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    memberLoginId: null,
    isActive: false,
    familyGroup: null,
    courseRegistration: null
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        updateAuthenticationStatus: (state, action) => {
            state.memberLoginId = action.payload.memberLoginId
            state.isActive = action.payload.isActive
        },
        updateFamilyGroup: (state, action) => {
            state.familyGroup = action.payload
        },
        updateCourseRegistration: (state, action) => {
            state.courseRegistration = action.payload
        },
        resetAuthenticationStatus: () => initialState
    },
});

export const {updateAuthenticationStatus,updateFamilyGroup,updateCourseRegistration, resetAuthenticationStatus} = authenticationSlice.actions;

export default authenticationSlice.reducer;

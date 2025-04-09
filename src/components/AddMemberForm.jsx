import { useDispatch} from "react-redux";
import { resetForm} from "../redux/signUpFormSlice.jsx";
import {toast} from 'react-toastify';
import RegistrationForm from "@/components/RegistrationForm.jsx";
import axiosInstance from "@/axios/axiosInstance.js";
import React, {useState} from "react";




const AddMemberForm = ({onSuccess}) => {
    const dispatch = useDispatch();
    const authentication = useState(state => state?.authentication)

    const handleFormSubmit = async (data) => {
        try {
            const memberResponse = await axiosInstance.post("/family/members",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-family-group-id" : authentication?.memberLoginId
                    }
                });
            const response = await memberResponse?.data;
            if (!memberResponse.ok) {
                throw new Error(response.message || `Server Error: ${response.status}`);
            }
            dispatch(resetForm());
            toast.success( 'Member Added SuccessFully')
        } catch (error) {
            console.error("Submission error", error);
            toast.error(error.message || "Something went wrong", {position: "top-right", autoClose: 1000});
        }
    };

    return (
        <div>
            <RegistrationForm
                isSignUp={false}
                onSuccess={onSuccess}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
};


export default AddMemberForm;

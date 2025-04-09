import {useDispatch, useSelector} from "react-redux";
import { resetForm} from "../redux/signUpFormSlice.jsx";
import {toast} from 'react-toastify';
import RegistrationForm from "@/components/RegistrationForm.jsx";
import axiosInstance from "@/axios/axiosInstance.js";
import React from "react";
import {useNavigate} from "react-router";
import UpdateState from "@/hooks/useFamilyGroupUtils.js";
import useFamilyGroupUtils from "@/hooks/useFamilyGroupUtils.js";

const AddMemberForm = ({onSuccess}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const familyGroupId = useSelector(state => state?.authentication?.familyGroup?.familyGroupId);
    const {syncFamilyGroupState} = useFamilyGroupUtils();
    console.log("grpId", familyGroupId)

    const handleFormSubmit = async (data) => {
        try {
            const memberResponse = await axiosInstance.post("/family/members",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-family-group-id" : familyGroupId
                    }
                });
            const response = await memberResponse?.data;
            if (memberResponse.status !== 200) {
                throw new Error(response.message || `Server Error: ${response.status}`);
            }
            dispatch(resetForm());
            await syncFamilyGroupState();
            navigate('/dashboard/family')
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

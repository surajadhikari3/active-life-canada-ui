import axiosInstance from "@/axios/axiosInstance.js";
import {useDispatch, useSelector} from "react-redux";
import {updateFamilyGroup} from "@/redux/authenticationSlice.jsx";

const useFamilyGroupUtils =  () => {
    const authentication = useSelector(state => state?.authentication);
    const dispatch = useDispatch();


        const syncFamilyGroupState = async () => {
            try {
                const res = await axiosInstance.get(`/authentication/familyGroup/${authentication?.memberLoginId}`);
                dispatch(updateFamilyGroup(res.data));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        return {
            syncFamilyGroupState
        }
    }

    export default useFamilyGroupUtils;
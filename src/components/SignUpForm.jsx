import { useDispatch} from "react-redux";
import { resetForm} from "../redux/signUpFormSlice.jsx";
import {useNavigate} from "react-router";
import {AUTHENTICATION_BASE_URL} from "../constant/activeLifeConstants.jsx";
import {toast} from 'react-toastify';
import RegistrationForm from "@/components/RegistrationForm.jsx";




const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleFormSubmit = async (data) => {
        try {
                console.log("data", data)
                const signUpUrl = AUTHENTICATION_BASE_URL + "/signup";
                const singUpResponse = await fetch(signUpUrl, {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify(data)
                })
               const response = await singUpResponse.json();

            if (!singUpResponse.ok) {
                throw new Error(response.message || `Server Error: ${response.status}`);
            }
            dispatch(resetForm());
            toast.success( 'Signup SuccessFul')
            navigate('/login');
        } catch (error) {
            console.error("Submission error", error);
            toast.error(error.message || "Something went wrong", {position: "top-right", autoClose: 1000});
        }
    };

    return (
        <div>
            <RegistrationForm
                isSignUp={true} // Set this depending on the use case
                onSubmit={handleFormSubmit} // Passing the submit handler function
                onAutoSubmit={(name, value) => console.log(name, value)} // Optionally handle auto-submit
            />
        </div>
    )
};


export default SignUpForm;

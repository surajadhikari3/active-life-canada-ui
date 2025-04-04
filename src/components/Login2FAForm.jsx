import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector, useDispatch} from "react-redux";
import {updateFormData, resetForm} from "../redux/login2FAFormSlice.jsx";
import {login2FAFormSchema} from "../validation/login2FAValidationSchema.jsx";
import {useNavigate} from "react-router";
import {updateAuthenticationStatus} from "../redux/authenticationSlice.jsx";
import { toast } from 'react-toastify';
import {AUTHENTICATION_BASE_URL} from "../constant/activeLifeConstants.jsx";

const Login2FAForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.login2FAForm);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(login2FAFormSchema),
        defaultValues: formData,
    });

    const handleAutoSave = (e) => {
        dispatch(updateFormData({[e.target.name]: e.target.value}));
    };

    //since it is promise calling the async await....
    const onSubmit = async (data) => {
            try {
                const response = await fetch(AUTHENTICATION_BASE_URL + "/login/2fa", {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message || `Server Error: ${response.status}`);
                }

                console.log("Server Response", responseData);
                dispatch(resetForm());
                reset();
                dispatch(updateAuthenticationStatus({
                    memberLoginId: data.familyMemberId,
                    isActive: true
                }))
                toast.success('2FA Login Successful!', { position: "top-right", autoClose: 3000 });
                navigate('/')
            } catch (error) {
                console.error("Submission error", error);
                toast.error(error.message || "Something went wrong", { position: "top-right", autoClose: 3000 });
            }
        };

    return (
        <>
            <div
                className="flex min-h-full flex-1 justify-center items-center flex-col justify-center px-6 py-12 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)}
                      className="w-full justify-center max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">2FA Login </h2>
                    {[
                        {
                            name: "familyMemberId",
                            label: "Family Member Id",
                            type: "text",
                            placeholder: "Enter your family Member Id"
                        },

                        {
                            name: "otp",
                            label: "OTP",
                            type: "number",
                            placeholder: "Enter your OTP"
                        },
                    ].map(({name, label, type, placeholder}) => (
                        <div key={name} className="sm:col-span-4">
                            <label className="block text-sm font-medium text-gray-900">{label}</label>
                            <div className="mt-2">
                                <input
                                    {...register(name)}
                                    type={type}
                                    className="block w-full rounded-md border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder={placeholder}
                                    onChange={handleAutoSave}
                                />
                            </div>
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
};


export default Login2FAForm;

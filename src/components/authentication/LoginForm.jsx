import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector, useDispatch} from "react-redux";
import {resetForm, updateLoginFormData} from "../../redux/loginFormSlice.jsx";
import {loginFormSchema} from "../../validation/loginValidationSchema.jsx";
import {useNavigate} from "react-router";
import {AUTHENTICATION_BASE_URL} from "../../constant/activeLifeConstants.jsx";
import {toast} from 'react-toastify';
import {update2FAFormData} from "@/redux/login2FAFormSlice.jsx";


const LoginForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.loginForm);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(loginFormSchema),
        defaultValues: formData,
    });

    const handleAutoSave = (e) => {
        dispatch(updateLoginFormData({[e.target.name]: e.target.value}));
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch(AUTHENTICATION_BASE_URL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `Server Error: ${response.status}`);
            }

            console.log("Server Response", responseData);
            dispatch(resetForm());
            reset();
            dispatch(update2FAFormData({
                familyMemberId: data.familyMemberId,
                otp: ''
            }))
            toast.success('Login Successful! OTP sent', {position: "top-right", autoClose: 3000});
            navigate('/login2FA');

        } catch (error) {
            console.error("Submission error", error);
            toast.error(error.message || "Something went wrong", {position: "top-right", autoClose: 3000});
        }
    };


    return (
        <>
            <div
                className="flex min-h-full flex-1 justify-center items-center flex-col justify-center px-6 py-12 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)}
                      className="w-full justify-center max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Family Login</h2>
                    {/*<p className="text-sm text-gray-600">Please fill out the form below.</p>*/}

                    {[
                        {
                            name: "familyMemberId",
                            label: "Family Member Id",
                            type: "text",
                            placeholder: "Enter your family Member Id"
                        },

                        {
                            name: "familyPin",
                            label: "Family Pin",
                            type: "password",
                            placeholder: "Enter a 5-digit pin"
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
export default LoginForm;

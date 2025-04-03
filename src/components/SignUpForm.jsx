import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector, useDispatch} from "react-redux";
import {updateFormData, resetForm} from "../redux/signUpFormSlice.jsx";
import {signUpFormSchema} from "../validation/signupValidationSchema.jsx";
import {ChevronDownIcon} from "@heroicons/react/16/solid/index.js";
import {useNavigate} from "react-router";
import {AUTHENTICATION_BASE_URL} from "../constant/activeLifeConstants.jsx";
import {toast} from 'sonner';


const SignUpForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.signUpForm);

    const navigate = useNavigate()

    const {
        register, handleSubmit, reset, formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(signUpFormSchema), defaultValues: formData,
    });

    const handleAutoSave = (e) => {
        dispatch(updateFormData({[e.target.name]: e.target.value}));
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch(AUTHENTICATION_BASE_URL + "/signup", {

                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(data)
            })
            await response.json();
            dispatch(resetForm());
            reset();
            toast('Signup SuccessFul')
            navigate('/login');
        } catch (error) {
            console.error("Submission error", error);
            alert("Failed to submit form. Please try again")
        }
    };

    return (<>
            <div
                className="flex min-h-full flex-1 justify-center items-center flex-col justify-center px-6 py-12 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)}
                      className="w-full justify-center max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Family Sign Up</h2>
                    {/*<p className="text-sm text-gray-600">Please fill out the form below.</p>*/}

                    {[{name: "name", label: "Name", type: "text", placeholder: "Enter your name"}, {
                        name: "familyPin", label: "Family Pin", type: "number", placeholder: "Enter a 5-digit pin"
                    }, {name: "city", label: "City", type: "text", placeholder: "Enter your city"}, {
                        name: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "Enter your email"
                    }, {
                        name: "homePhone", label: "Home Phone", type: "tel", placeholder: "Enter your phone number"
                    },].map(({name, label, type, placeholder}) => (<div key={name} className="sm:col-span-4">
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
                        </div>))}

                    <div className="sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-900">Preferred Contact</label>
                        <div className="relative mt-2">
                            <select
                                {...register("preferredContact")}
                                className="block w-full appearance-none rounded-md border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={handleAutoSave}
                            >
                                <option value="">Select an option</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="sms">SMS</option>
                            </select>
                            <ChevronDownIcon
                                className="absolute right-3 top-3 h-5 w-5 text-gray-500 pointer-events-none"/>
                        </div>
                        {errors.preferredContact &&
                            <p className="text-red-500 text-sm mt-1">{errors.preferredContact.message}
                            </p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </>)
};


export default SignUpForm;

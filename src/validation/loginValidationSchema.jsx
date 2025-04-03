import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
    familyMemberId: yup.number()
        .typeError("Family Member pin must be a number") // Ensures it's a number
        .integer("Family Pin must be an integer") // Prevents decimals
        .required("Family member id is required"),
    familyPin: yup
        .string()
        .required("Family Pin is required")
});

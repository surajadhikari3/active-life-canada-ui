import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
    familyMemberId: yup.number()
        .typeError("Family Member pin must be a number") // Ensures it's a number
        .integer("Family Pin must be an integer") // Prevents decimals
        .required("Family member id is required"),
    familyPin: yup
        .number()
        .typeError("Family Pin must be a number") // Ensures it's a number
        .integer("Family Pin must be an integer") // Prevents decimals
        .min(10000, "Family Pin must be at least 5 digits") // Ensures minimum 5 digits
        .max(99999, "Family Pin must be at most 5 digits") // Ensures exactly 5 digits
        .required("Family Pin is required")
});

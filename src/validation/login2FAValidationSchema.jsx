import * as yup from "yup";

export const login2FAFormSchema = yup.object().shape({
    familyMemberId: yup.number()
        .typeError("Family Member pin must be a number") // Ensures it's a number
        .integer("Family Pin must be an integer") // Prevents decimals
        .required("Family member id is required"),
    otp: yup
        .number()
        .typeError("Otp must be a number") // Ensures it's a number
        .integer("Otp must be an integer") // Prevents decimals
        .required("OTP is required")
});

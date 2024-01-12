import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .trim()
    .max(55, "First name should be max 55 chars"),
  lastName: Yup.string()
    .required("Last name is required")
    .trim()
    .max(55, "Last name should be max 55 chars"),
  email: Yup.string().email().required("Email is required").trim().lowercase(),
  password: Yup.string()
    .min(4, "Password must be at least 4 chars")
    .max(16, "Password must be at max 16 chars")
    .required(),
  gender: Yup.string().trim().oneOf(["male", "female", "preferNotToSay"]),
});

export const emailValidationSchema = Yup.string()
  .email("Must be a valid email.")
  .required()
  .trim()
  .lowercase();

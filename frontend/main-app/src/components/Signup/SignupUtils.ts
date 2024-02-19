import { z } from "zod";
import { IValidateSignupForm, SignupForm, SignupFormError } from "./types";

const signupFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  passwordRepeat: z.string().min(8, "Password must be at least 8 characters long")
})
  .refine((data: Record<string, string>) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["password"]
  })
  .refine((data: Record<string, string>) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"]
  });

export const validateSignupForm: IValidateSignupForm = ({ signupForm, setFormErrors }) => {
  const validation: z.SafeParseReturnType<SignupForm, SignupForm> =
    signupFormSchema.safeParse(signupForm);

  if (!validation.success) {
    const zodFieldErrors: SignupFormError =
      "error" in validation && validation.error.formErrors.fieldErrors;

    setFormErrors(zodFieldErrors);
    return false;
  }
  setFormErrors(null);
  return true;
};

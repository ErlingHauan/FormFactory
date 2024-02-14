import { z } from "zod";
import { LoginForm, LoginFormError } from "./types";

type IValidateLoginForm = {
  loginForm: LoginForm;
  setFormErrors: (value: LoginFormError | null) => void;
};

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const validateLoginForm = ({ loginForm, setFormErrors }: IValidateLoginForm): boolean => {
  const validation: z.SafeParseReturnType<LoginForm, LoginForm> =
    loginFormSchema.safeParse(loginForm);

  if (!validation.success) {
    const zodFieldErrors: LoginFormError =
      "error" in validation && validation.error.formErrors.fieldErrors;

    setFormErrors(zodFieldErrors);
    return false;
  }
  setFormErrors(null);
  return true;
};

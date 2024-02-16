import { z } from "zod";
import { IValidateLoginForm, LoginForm, LoginFormError } from "./types";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const validateLoginForm: IValidateLoginForm = ({ loginForm, setFormErrors }) => {
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

export function axiosPostForm(
  targetUrl: string,
  formData: FormData,
  redirectUrl: string,
  navigate: NavigateFunction,
) {
  const formObject = Object.fromEntries(formData);
  axios
    .post(targetUrl, formObject)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        navigate(redirectUrl);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

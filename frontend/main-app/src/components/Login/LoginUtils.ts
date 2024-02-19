import { z } from "zod";
import { IValidateLoginForm, LoginForm, LoginFormError } from "./types";
import axios from "axios";

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

export const axiosPostForm = async (
  targetUrl: string,
  formData: FormData,
): Promise<boolean> => {
  const formObject = Object.fromEntries(formData);
  try {
    const response = await axios.post(targetUrl, formObject);
    console.log(response);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

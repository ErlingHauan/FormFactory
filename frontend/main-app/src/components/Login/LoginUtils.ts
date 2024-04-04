import { z } from "zod";
import { IValidateLoginForm, LoginForm, LoginFormError } from "./types";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const validateLoginForm: IValidateLoginForm = ({ loginForm, setFieldErrors }) => {
  const validation: z.SafeParseReturnType<LoginForm, LoginForm> =
    loginFormSchema.safeParse(loginForm);

  if (!validation.success) {
    const zodFieldErrors: LoginFormError =
      "error" in validation && validation.error.formErrors.fieldErrors;

    setFieldErrors(zodFieldErrors);
    return false;
  }
  setFieldErrors(null);
  return true;
};

export const getApiUrl = (): string => {
  const env = process.env.NODE_ENV;
  const apiUrlDev = process.env.API_URL_DEVELOPMENT;
  const apiUrlProd = process.env.API_URL_PRODUCTION;

  if (env === "development") {
    if (!apiUrlDev) {
      throw new Error("API_URL_DEVELOPMENT is not set in the .env file.");
    }
    return apiUrlDev;
  }

  if (env === "production") {
    if (!apiUrlProd) {
      throw new Error("API_URL_PRODUCTION is not set in the .env file.");
    }
    return apiUrlProd;
  }

  throw new Error("Development/production mode is not set in the package.json startup script.");
};

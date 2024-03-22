import classes from "./Login.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitForm, getApiUrl, validateLoginForm } from "./LoginUtils";
import { LoginForm, LoginFormError } from "./types";
import { useTranslation } from "react-i18next";
import { alertToRender } from "../FormViewer/validationUtils";

export const Login = (): React.JSX.Element => {
  const { authError } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formErrors, setFormErrors] = useState<LoginFormError | null>(null);
  const [error, setError] = useState(authError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginForm: LoginForm = Object.fromEntries(formData);
    const formIsValid: boolean = validateLoginForm({ loginForm, setFormErrors });

    if (formIsValid) {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/users/login`;
      if (await submitForm(targetUrl, formData)) {
        navigate("/dashboard");
      } else {
        setError("loginServerError");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.loginContainer} noValidate>
      <Heading level={1} size="xlarge">
        {t("login_page.title")}
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield
          name="email"
          type="email"
          label={t("signup_page.email.label")}
          error={formErrors?.email}
        />
        <Textfield
          name="password"
          type="password"
          label={t("signup_page.password.label")}
          error={formErrors?.password}
        />
      </div>

      {error && alertToRender(error, t)}
      <div className={classes.buttonContainer}>
        <Button type="submit" className={classes.button}>
          {t("login_page.login.button")}
        </Button>
        <Button className={classes.button} as="a" href="/signup" variant="secondary" size="small">
          {t("login_page.signup.button")}
        </Button>
      </div>
    </form>
  );
};

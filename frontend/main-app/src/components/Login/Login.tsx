import classes from "./Login.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateLoginForm } from "./LoginUtils";
import { getApiUrl } from "../../utils/getApiUrl";
import { LoginForm, LoginFormError } from "./types";
import { useTranslation } from "react-i18next";
import { alertToRender } from "../FormViewer/validationUtils";
import axios from "axios";

export const Login = (): React.JSX.Element => {
  const { authError } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fieldErrors, setFieldErrors] = useState<LoginFormError | null>(null);
  const [errorAlert, setErrorAlert] = useState(authError);

  useEffect(() => {
    if (errorAlert === "authError") {
      const timeout = setTimeout(() => {
        setErrorAlert(null);
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [errorAlert]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginForm: LoginForm = Object.fromEntries(formData);
    const formIsValid = validateLoginForm({ loginForm, setFieldErrors });

    if (!formIsValid) {
      return;
    }

    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/users/login`;

    try {
      await axios.post(targetUrl, loginForm, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorAlert("loginServerError");
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
          error={fieldErrors?.email}
        />
        <Textfield
          name="password"
          type="password"
          label={t("signup_page.password.label")}
          error={fieldErrors?.password}
        />
      </div>

      {errorAlert && alertToRender(errorAlert, t)}

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

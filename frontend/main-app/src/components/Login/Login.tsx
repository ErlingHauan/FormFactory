import classes from "./Login.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPostForm, getApiUrl, validateLoginForm } from "./LoginUtils";
import { LoginForm, LoginFormError } from "./types";
import { useTranslation } from "react-i18next";

export const Login = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<LoginFormError | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginForm: LoginForm = Object.fromEntries(formData);
    const formIsValid: boolean = validateLoginForm({ loginForm, setFormErrors });

    if (formIsValid) {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/auth/login`;
      (await axiosPostForm(targetUrl, formData)) && navigate("/dashboard");
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

import classes from "./Signup.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPostForm, getApiUrl } from "../Login/LoginUtils";
import { validateSignupForm } from "./SignupUtils";
import { SignupForm, SignupFormError } from "./types";
import { useTranslation } from "react-i18next";

export const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<SignupFormError | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const signupForm: SignupForm = Object.fromEntries(formData);
    const formIsValid: boolean = validateSignupForm({ signupForm, setFormErrors });

    if (formIsValid) {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/auth/signup`;
      await axiosPostForm(targetUrl, formData) && navigate("/form-builder");
    }
  };

  return (
    <form className={classes.signupContainer} onSubmit={handleSubmit} noValidate>
      <Heading level={1} size="xlarge">
        {t("signup_page.title")}
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield
          name="email"
          type="email"
          label={t("signup_page.email.label")}
          error={formErrors?.email}
        />
        <Textfield
          name="organization"
          label={t("signup_page.organization.label")}
          placeholder="Optional"
        />
        <Textfield
          name="password"
          type="password"
          label={t("signup_page.password.label")}
          error={formErrors?.password}
        />
        <Textfield
          name="passwordRepeat"
          type="password"
          label={t("signup_page.password.repeat.label")}
          error={formErrors?.passwordRepeat}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button type="submit" className={classes.button}>
          {t("signup_page.signup.button")}
        </Button>
        <Button className={classes.button} as="a" href="/login" variant="secondary" size="small">
          {t("signup_page.go.to.login.button")}
        </Button>
      </div>
    </form>
  );
};

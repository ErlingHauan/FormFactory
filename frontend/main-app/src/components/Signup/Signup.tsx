import classes from "./Signup.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/getApiUrl";
import { validateSignupForm } from "./SignupUtils";
import { SignupForm, SignupFormError } from "./types";
import { useTranslation } from "react-i18next";
import { alertToRender } from "../FormViewer/validationUtils";
import axios from "axios";
import { UserContext } from "../../context";

export const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUserFromContext } = useContext(UserContext);

  const [fieldErrors, setFieldErrors] = useState<SignupFormError | null>(null);
  const [errorAlert, setErrorAlert] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const signupForm: SignupForm = Object.fromEntries(formData);
    const formIsValid = validateSignupForm({ signupForm, setFieldErrors });

    if (!formIsValid) {
      return;
    }

    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/users`;

    try {
      const result = await axios.post(targetUrl, signupForm, {
        withCredentials: true,
      });
      setUserFromContext(result.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorAlert("signupServerError");
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
          error={fieldErrors?.email}
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
          error={fieldErrors?.password}
        />
        <Textfield
          name="passwordRepeat"
          type="password"
          label={t("signup_page.password.repeat.label")}
          error={fieldErrors?.passwordRepeat}
        />
      </div>
      {errorAlert && alertToRender(errorAlert, t)}
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

import classes from "./Signup.module.css";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPostForm } from "../Login/LoginUtils";
import { validateSignupForm } from "./SignupUtils";
import { SignupForm, SignupFormError } from "./types";

export const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<SignupFormError | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const signupForm: SignupForm = Object.fromEntries(formData);
    const formIsValid: boolean = validateSignupForm({ signupForm, setFormErrors });

    if (formIsValid) {
      const targetUrl = "https://localhost:8080/api/auth/signup";
      axiosPostForm(targetUrl, formData) && navigate("/form-builder");
    }
  };

  return (
    <form className={classes.signupContainer} onSubmit={handleSubmit} noValidate>
      <Heading level={1} size="xlarge">
        Sign up
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield name="email" type="email" label="E-mail" error={formErrors?.email} />
        <Textfield name="organization" label="Organization" placeholder="Optional" />
        <Textfield name="password" type="password" label="Password" error={formErrors?.password} />
        <Textfield name="passwordRepeat" type="password" label="Repeat password" error={formErrors?.passwordRepeat} />
      </div>
      <div className={classes.buttonContainer}>
        <Button type="submit" className={classes.button}>
          Sign up
        </Button>
        <Button className={classes.button} as="a" href="/login" variant="secondary" size="small">
          Go to the log in page
        </Button>
      </div>
    </form>
  );
};

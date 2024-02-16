import React, { FormEvent, useState } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateLoginForm } from "./LoginUtils";
import { LoginForm, LoginFormError } from "./types";

export const Login = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<LoginFormError | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginForm: LoginForm = Object.fromEntries(formData) as LoginForm;

    const isFormValid: boolean = validateLoginForm({ loginForm, setFormErrors });

    if (isFormValid) {
      const url = "http://localhost:8080/api/auth/login";
      axios
        .post(url, {
          Email: loginForm.email,
          Password: loginForm.password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/form-builder");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.loginContainer} noValidate>
      <Heading level={1} size="xlarge">
        Log in
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield name="email" type="email" label="E-mail" error={formErrors?.email} />
        <Textfield name="password" type="password" label="Password" error={formErrors?.password} />
      </div>
      <div className={classes.buttonContainer}>
        <Button type="submit" className={classes.button}>
          Log in
        </Button>
        <Button className={classes.button} as="a" href="/signup" variant="secondary" size="small">
          Go to the sign up page
        </Button>
      </div>
    </form>
  );
};

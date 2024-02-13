import React, { FormEvent } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const signupForm = {
      email: formData.get("email"),
      organization: formData.get("organization"),
      password: formData.get("password"),
      passwordRepeat: formData.get("passwordRepeat"),
    };

    // To-do: front end validation

    const url = "https://localhost:4050/api/auth/signup";

    axios
      .post(url, {
        Email: signupForm.email,
        Password: signupForm.password,
        Organization: signupForm.organization,
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
  };

  return (
    <form className={classes.signupContainer} onSubmit={handleSubmit}>
      <Heading level={1} size="xlarge">
        Sign up
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield name="email" type="email" label="E-mail" />
        <Textfield name="organization" label="Organization" placeholder="Optional" />
        <Textfield name="password" type="password" label="Password" />
        <Textfield name="passwordRepeat" type="password" label="Repeat password" />
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

import React, { FormEvent } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import { Button, Heading, Textfield } from "@digdir/design-system-react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const loginForm = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // To-do: front end validation

    const url = "https://localhost:4050/api/auth/login";

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
  };

  return (
    <form onSubmit={handleSubmit} className={classes.loginContainer}>
      <Heading level={1} size="xlarge">
        {" "}
        Log in
      </Heading>
      <div className={classes.fieldContainer}>
        <Textfield name="email" type="email" label="E-mail" className={classes.spacing} />
        <Textfield name="password" type="password" label="Password" className={classes.spacing} />
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

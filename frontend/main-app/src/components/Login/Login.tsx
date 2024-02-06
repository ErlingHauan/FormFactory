import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import {Button, Heading, Textfield} from "@digdir/design-system-react";
import classes from "./Login.module.css";

export const Login = (): React.JSX.Element => {
    return (
        <div className={classes.loginContainer}>
            <Heading level={1} size="xlarge" spacing>Log in</Heading>
            <Textfield label="E-mail" className={classes.spacing}/>
            <Textfield label="Password" className={classes.spacing}/>
            <Button className={classes.button}>Log in</Button>
        </div>
    );
}
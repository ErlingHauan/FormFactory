import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import {Button, Heading, Textfield} from "@digdir/design-system-react";
import classes from "./Signup.module.css";

export const Signup = (): React.JSX.Element => {
    return (
        <div className={classes.signupContainer}>
            <Heading level={1} size="xlarge">Sign up</Heading>
            <div className={classes.fieldContainer}>
                <Textfield type="email" label="E-mail"/>
                <Textfield label="Organization" placeholder="Optional"/>
                <Textfield type="password" label="Password"/>
                <Textfield type="password" label="Repeat password"/>
            </div>
            <div className={classes.buttonContainer}>
                <Button className={classes.button}>Sign up</Button>
                <Button className={classes.button} as="a" href="/login" variant="secondary" size="small">Go to the log
                    in
                    page</Button>
            </div>
        </div>
    );
}
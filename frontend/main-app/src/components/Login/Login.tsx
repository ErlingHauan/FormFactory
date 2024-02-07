import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import {Button, Heading, Textfield} from "@digdir/design-system-react";
import classes from "./Login.module.css";

export const Login = (): React.JSX.Element => {
    return (
        <div className={classes.loginContainer}>
            <Heading level={1} size="xlarge"> Log in</Heading>
            <div className={classes.fieldContainer}>
                <Textfield type="email" label="E-mail" className={classes.spacing}/>
                <Textfield type="password" label="Password" className={classes.spacing}/>
            </div>
            <div className={classes.buttonContainer}>
                <Button className={classes.button}>Log in</Button>
                <Button className={classes.button} as="a" href="/signup" variant="secondary" size="small">Go to the sign
                    up
                    page</Button>
            </div>
        </div>
    )
        ;
}
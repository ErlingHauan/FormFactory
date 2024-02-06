import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import {Button, Heading, Textfield} from "@digdir/design-system-react";
import classes from "./Signup.module.css";

export const Signup = (): React.JSX.Element => {
    return (
        <div className={classes.signupContainer}>
            <Heading level={1} size="xlarge" spacing>Sign up</Heading>
            <Textfield type="email" label="E-mail" className={classes.spacing}/>
            <Textfield label="Organization" className={classes.spacing} placeholder="Optional"/>
            <Textfield type="password" label="Password" className={classes.spacing}/>
            <Textfield type="password" label="Repeat password" className={classes.spacing}/>
            <Button className={classes.button}>Sign up</Button> 
            <Button className={classes.button} as="a" href="/login" variant="secondary" size="small">Go to log in page</Button>
        </div>
    );
}
import classes from "./NotFound.module.css";
import { Heading, Link, Paragraph } from "@digdir/design-system-react";
import React from "react";
import notFoundImage from "./notFound.png";
export const NotFound: React.FC = () => {
  return (
    <main className={classes.card}>
      <div className={classes.text}>
        <Heading spacing>Page not found</Heading>
        <Paragraph>We could not find the page you were looking for.</Paragraph>
        <Link href="/login">Go to the login page</Link>
        <Link href="/signup">Go to the signup page</Link>
      </div>
      <img
        src={notFoundImage}
        alt="confused boy holding a sheet of paper"
        className={classes.image}
      />
    </main>
  );
};

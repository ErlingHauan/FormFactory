import React from "react";
import classes from "./Footer.module.css";
import { Link } from "@digdir/design-system-react";

export const Footer = (): React.JSX.Element => {
  return (
    <footer className={classes.footer}>
      <div className={classes.linkContainer}>
        <Link href="https://github.com/ErlingHauan/FormFactory">Form Factory at GitHub</Link>
        <Link href="https://aksel.nav.no/">Icons by Aksel</Link>
        <Link href="https://bgjar.com/">Background pattern by BGJar</Link>
        <Link href="https://www.designsystemet.no/">Components and colors by Designsystemet</Link>
      </div>
    </footer>
  );
};

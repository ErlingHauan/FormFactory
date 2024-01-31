import React from "react";
import classes from "./Footer.module.css";
import { BranchingIcon } from '@navikt/aksel-icons';
import { Link } from "@digdir/design-system-react";

export const Footer = (): React.JSX.Element => {
  return (
    <footer className={classes.footer}>
      <Link href="https://github.com/ErlingHauan/FormFactory"><BranchingIcon />GitHub</Link>
    </footer>
  );
};

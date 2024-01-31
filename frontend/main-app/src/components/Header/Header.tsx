import React from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { TasklistFillIcon } from '@navikt/aksel-icons';
import classes from "./Header.module.css";

export const Header = (): React.JSX.Element => {
  return (
    <header className={classes.header}>
      <Heading level={1}><TasklistFillIcon />Form Factory</Heading>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Form Builder</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

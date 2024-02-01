import React from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";

export const Header = (): React.JSX.Element => {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.headerLink}>
        <Heading level={1} size="large">
          Form Factory
        </Heading>
        <ClipboardCheckmarkFillIcon className={classes.headerIcon} />
      </Link>
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

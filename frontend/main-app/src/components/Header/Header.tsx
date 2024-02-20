import React from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";
import { DropdownMenu } from "@digdir/design-system-react";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";

export const Header = (): React.JSX.Element => {
  const isSmallScreen = window.innerWidth < 768;

  if (isSmallScreen) {
    return (
      <header className={classes.header}>
        <Link href="/" className={classes.headerLink}>
          <Heading level={1} size="medium">
            Form Factory
          </Heading>
          <ClipboardCheckmarkFillIcon className={classes.headerIcon} />
        </Link>
        <DropdownMenu size="small">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/form-builder">Form Builder</Link>
            </li>
          </ul>
        </DropdownMenu>
      </header>
    );
  }

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.headerLink}>
        <Heading level={1} size="medium">
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
            <Link href="/form-builder">Form Builder</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

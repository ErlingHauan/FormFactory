import React, { useEffect } from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";
import { DropdownMenu } from "@digdir/design-system-react";

export const Header = (): React.JSX.Element => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const isSmallScreen = windowSize < 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const HeadingBrand = () => (
    <Link href="/" className={classes.headerLink}>
      <Heading level={1} size="medium">
        Form Factory
      </Heading>
      <ClipboardCheckmarkFillIcon className={classes.headerIcon} />
    </Link>
  );

  if (isSmallScreen) {
    return (
      <header className={classes.header}>
        <HeadingBrand />
        <DropdownMenu size="small">
          <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild>
                <a href="/">Home</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <a href="/form-builder">Form Builder</a>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
      </header>
    );
  }

  return (
    <header className={classes.header}>
      <HeadingBrand />
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

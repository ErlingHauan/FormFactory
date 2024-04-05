import React, { useEffect } from "react";
import classes from "./Navigation.module.css";
import { DropdownMenu, Link } from "@digdir/design-system-react";
import { MenuHamburgerIcon } from "@navikt/aksel-icons";
import { UserDropdown } from "../UserDropdown";
import { t } from "i18next";

export const Navigation = (): React.JSX.Element => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const isSmallScreen = windowSize < 1000;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <nav className={classes.navigation}>
        <UserDropdown />
        <DropdownMenu size="small">
          <DropdownMenu.Trigger variant="secondary" icon="true">
            <MenuHamburgerIcon className={classes.menuIcon} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild>
                <a href="/dashboard">Dashboard</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <a href="/form-builder">Form Builder</a>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
      </nav>
    );
  }

  if (!isSmallScreen) {
    return (
      <nav className={classes.navigation}>
        <ul className={classes.horizontalLinkList}>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/form-builder">{t("header_form.factory.form.builder.link")}</Link>
          </li>
        </ul>
        <UserDropdown />
      </nav>
    );
  }
};

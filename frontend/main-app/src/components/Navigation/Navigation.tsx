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
                <Link href="/dashboard">{t("dashboard")}</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/form-builder">{t("form_builder")}</Link>
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
            <Link href="/dashboard">{t("dashboard")}</Link>
          </li>
          <li>
            <Link href="/form-builder">{t("form_builder")}</Link>
          </li>
        </ul>
        <UserDropdown />
      </nav>
    );
  }
};

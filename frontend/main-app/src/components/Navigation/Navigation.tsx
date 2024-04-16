import React, { useEffect } from "react";
import classes from "./Navigation.module.css";
import { UserDropdown } from "../UserDropdown";

//
// TODO: Make lines that are commented out into a conditional render for "Signup" and "Login" links.
//

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
        {/*<DropdownMenu size="small">*/}
        {/*  <DropdownMenu.Trigger variant="secondary" icon="true">*/}
        {/*    <MenuHamburgerIcon className={classes.menuIcon} />*/}
        {/*  </DropdownMenu.Trigger>*/}
        {/*  <DropdownMenu.Content>*/}
        {/*    <DropdownMenu.Group>*/}
        {/*      <DropdownMenu.Item asChild>*/}
        {/*        <Link href={"/dashboard"}>{t("dashboard")}</Link>*/}
        {/*      </DropdownMenu.Item>*/}
        {/*    </DropdownMenu.Group>*/}
        {/*  </DropdownMenu.Content>*/}
        {/*</DropdownMenu>*/}
      </nav>
    );
  }

  if (!isSmallScreen) {
    return (
      <nav className={classes.navigation}>
        {/*<ul className={classes.horizontalLinkList}>*/}
        {/*  <li>*/}
        {/*    <Link href={"/signup"}>{t("signup_page.title")}</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link href={"/login"}>{t("login_page.title")}</Link>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        <UserDropdown />
      </nav>
    );
  }
};

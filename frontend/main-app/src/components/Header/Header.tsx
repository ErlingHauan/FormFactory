import React, { useEffect } from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon, MenuHamburgerIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";
import { DropdownMenu } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

export const Header = (): React.JSX.Element => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const isSmallScreen = windowSize < 1000;
  const { t } = useTranslation();

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

  const Navigation = (): React.JSX.Element => {
    if (isSmallScreen) {
      return (
        <>
          <DropdownMenu size="small">
            <DropdownMenu.Trigger variant="tertiary" icon="true">
              <MenuHamburgerIcon className={classes.headerIcon} />
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
        </>
      );
    }

    if (!isSmallScreen) {
      return (
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/form-builder">{t("header_form.factory.form.builder.link")}</Link>
            </li>
          </ul>
        </nav>
      );
    }
  };

  const isFormViewer = window.location.pathname.startsWith("/view");
  if (isFormViewer) return;

  return (
    <div className={classes.header}>
      <HeadingBrand />
      <Navigation />
    </div>
  );
};

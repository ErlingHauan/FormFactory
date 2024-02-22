import React from "react";
import classes from "./Footer.module.css";
import { Link } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

export const Footer = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <footer className={classes.footer}>
      <div className={classes.linkContainer}>
        <Link href="https://github.com/ErlingHauan/FormFactory">
          {t("footer_form.factory.gitHub.link")}
        </Link>
        <Link href="https://aksel.nav.no/">{t("footer_form.factory.aksel.icons.link")}</Link>
        <Link href="https://bgjar.com/">
          {t("footer_form.factory.background.pattern.BGJar.link")}
        </Link>
        <Link href="https://www.designsystemet.no/">
          {t("footer_form.factory.designsystem.link")}
        </Link>
      </div>
    </footer>
  );
};

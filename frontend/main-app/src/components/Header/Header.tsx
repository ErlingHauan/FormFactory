import React from "react";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./Header.module.css";
import { useTranslation } from "react-i18next";

export const Header = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.headerLink}>
        <Heading level={1} size="medium">
          {t("header_form.factory.title.link")}
        </Heading>
        <ClipboardCheckmarkFillIcon className={classes.headerIcon} />
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/">{t("header_form.factory.home.link")}</Link>
          </li>
          <li>
            <Link href="/form-builder">{t("header_form.factory.form.builder.link")}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

import classes from "./NotFound.module.css";
import { Heading, Link, Paragraph } from "@digdir/design-system-react";
import React from "react";
import notFoundImage from "./notFound.png";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  const isFormUrl = window.location.pathname.startsWith("/view");
  const pageType = isFormUrl ? "form" : "page";

  return (
    <main className={classes.card}>
      <div className={classes.text}>
        <Heading spacing>
          {isFormUrl && t("not_found.title.form")}
          {!isFormUrl && t("not_found.title.page")}
        </Heading>
        <Paragraph>{t("not_found.message", { pageType })}</Paragraph>
        <Link href={"/login"}>{t("not_found.login.link")}</Link>
        <Link href={"/signup"}>{t("not_found.signup.link")}</Link>
      </div>
      <img
        src={notFoundImage}
        alt="confused boy holding a sheet of paper"
        className={classes.image}
      />
    </main>
  );
};

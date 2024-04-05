import React from "react";
import classes from "./SubHeader.module.css";
import { Heading, Link } from "@digdir/design-system-react";
import {
  ClipboardCheckmarkFillIcon,
  FloppydiskFillIcon,
  TasklistSendFillIcon,
} from "@navikt/aksel-icons";
import { t } from "i18next";

export const SubHeader: React.FC = () => {
  const pathname = window.location.pathname;

  const isLogin = pathname.startsWith("/login") || pathname === "/";
  const isFormBuilder = pathname.startsWith("/form-builder");
  const isDashboard = pathname.startsWith("/dashboard");
  const isFormViewer = pathname.startsWith("/view");

  const heading = () => {
    let title;

    switch (true) {
      case isLogin:
        title = t("login_page.title");
        break;
      case isFormBuilder:
        title = t("form_builder");
        break;
      case isDashboard:
        title = t("dashboard");
        break;
      case isFormViewer:
        title = formViewerHeading();
        break;
      default:
        title = t("not_found.title.page");
    }

    return title;
  };

  const links = () => {
    if (isFormBuilder) return formBuilderLinks();

    return;
  };

  return (
    <div className={classes.subHeader}>
      <Heading className={classes.subHeaderHeading} level={2} size="xxsmall">
        {heading()}
      </Heading>
      <div className={classes.subHeaderLinks}>{links()}</div>
    </div>
  );
};

const formBuilderLinks = () => {
  return (
    <>
      <Link>
        {t("form_builder.save")}
        <FloppydiskFillIcon className={classes.subHeaderIcon} />
      </Link>
      <Link>
        {t("form_builder.publish")}
        <TasklistSendFillIcon className={classes.subHeaderIcon} />
      </Link>
    </>
  );
};

const formViewerHeading = () => {
  return (
    <Link href="/">
      {t("header_form.factory.title.link")}
      <ClipboardCheckmarkFillIcon className={classes.subHeaderIcon} />
    </Link>
  );
};

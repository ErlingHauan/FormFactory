import React, { useEffect, useState } from "react";
import classes from "./SubHeader.module.css";
import { Heading, Link } from "@digdir/design-system-react";
import {
  ClipboardCheckmarkFillIcon,
  FilePlusFillIcon,
  FloppydiskFillIcon,
  TasklistSendFillIcon,
} from "@navikt/aksel-icons";
import { t } from "i18next";
import { useLocation } from "react-router-dom";

export const SubHeader: React.FC = () => {
  const [heading, setHeading] = useState<string | React.JSX.Element>("");
  const [links, setLinks] = useState<React.JSX.Element>(null);

  const pathname = useLocation().pathname;

  useEffect(() => {
    switch (true) {
      case pathname.startsWith("/login") || pathname === "/":
        setHeading(t("login_page.title"));
        break;
      case pathname.startsWith("/signup"):
        setHeading(t("signup_page.title"));
        break;
      case pathname.startsWith("/dashboard"):
        setHeading(t("dashboard"));
        setLinks(dashboardLink());
        break;
      case pathname.startsWith("/form-builder"):
        setHeading(t("form_builder"));
        setLinks(formBuilderLinks());
        break;
      case pathname.startsWith("/view"):
        setHeading(formViewerHeading());
        break;
      default:
        setHeading(t("not_found.title.page"));
        break;
    }
  }, [pathname]);

  return (
    <div className={classes.subHeader}>
      <Heading className={classes.subHeaderHeading} level={2} size="xxsmall">
        {heading}
      </Heading>
      <div className={classes.subHeaderLinks}>{links}</div>
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

const dashboardLink = () => {
  return (
    <Link href="/form-builder/new">
      {t("dashboard.new.form")}
      <FilePlusFillIcon className={classes.subHeaderIcon} />
    </Link>
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

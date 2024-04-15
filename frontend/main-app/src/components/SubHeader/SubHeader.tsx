import React, { useEffect, useState } from "react";
import classes from "./SubHeader.module.css";
import { Heading } from "@digdir/design-system-react";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
import { DashboardLink } from "./DashboardLink";
import { formViewerHeading } from "./utils";
import { FormBuilderLinks } from "./FormBuilderLinks";

export const SubHeader: React.FC = () => {
  const [heading, setHeading] = useState<string | React.JSX.Element>("");
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
        break;
      case pathname.startsWith("/form-builder"):
        setHeading(t("form_builder"));
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
      <div className={classes.subHeaderLinks}>
        {pathname.startsWith("/dashboard") && <DashboardLink />}
        {pathname.startsWith("/form-builder") && <FormBuilderLinks />}
      </div>
    </div>
  );
};

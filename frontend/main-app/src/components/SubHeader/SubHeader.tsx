import React, { useEffect, useState } from "react";
import classes from "./SubHeader.module.css";
import { Heading, Link } from "@digdir/design-system-react";
import { ClipboardCheckmarkFillIcon, FilePlusFillIcon } from "@navikt/aksel-icons";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { createNewForm } from "./utils";

export const SubHeader: React.FC = () => {
  const [heading, setHeading] = useState<string | React.JSX.Element>("");
  const [links, setLinks] = useState<React.JSX.Element>(null);
  const pathname = useLocation().pathname;

  useEffect(() => {
    switch (true) {
      case pathname.startsWith("/login") || pathname === "/":
        setHeading(t("login_page.title"));
        setLinks(null);
        break;
      case pathname.startsWith("/signup"):
        setHeading(t("signup_page.title"));
        break;
      case pathname.startsWith("/dashboard"):
        setHeading(t("dashboard"));
        // setLinks(dashboardLinks());
        break;
      case pathname.startsWith("/view"):
        setHeading(formViewerHeading());
        break;
      default:
        setHeading(t("not_found.title.page"));
        break;
    }
  }, [pathname]);

  // if (pathname.startsWith("/form-builder/")) return;

  return (
    <div className={classes.subHeader}>
      <Heading className={classes.subHeaderHeading} level={2} size="xxsmall">
        {heading}
      </Heading>
      <div className={classes.subHeaderLinks}>
        {links}
        {pathname.startsWith("/dashboard") && <DashboardLinks />}
      </div>
    </div>
  );
};

const DashboardLinks: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Link onClick={() => createNewForm(user, navigate)}>
      {t("dashboard.new.form")}
      <FilePlusFillIcon className={classes.subHeaderIcon} />
    </Link>
  );
};

const formViewerHeading = () => {
  return (
    <Link href="/">
      {t("form_factory")}
      <ClipboardCheckmarkFillIcon className={classes.subHeaderIcon} />
    </Link>
  );
};

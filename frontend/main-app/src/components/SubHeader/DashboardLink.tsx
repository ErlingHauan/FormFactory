import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { Link } from "@digdir/design-system-react";
import { createNewForm } from "./utils";
import { t } from "i18next";
import { FilePlusFillIcon } from "@navikt/aksel-icons";
import classes from "./SubHeader.module.css";

export const DashboardLink: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserSession();

  return (
    <Link onClick={() => createNewForm(user, navigate)}>
      {t("dashboard.new.form")}
      <FilePlusFillIcon className={classes.subHeaderIcon} />
    </Link>
  );
};

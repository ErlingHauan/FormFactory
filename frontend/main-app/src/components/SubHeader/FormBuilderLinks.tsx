import React, { useContext } from "react";
import { FormBuilderContext } from "../../../../form-builder/src/context";
import { Link } from "@digdir/design-system-react";
import { t } from "i18next";
import { FloppydiskFillIcon, TasklistSendFillIcon } from "@navikt/aksel-icons";
import { saveForm } from "./utils";
import classes from "./SubHeader.module.css";

export const FormBuilderLinks = () => {
  const { form } = useContext(FormBuilderContext);

  if (!form) return;

  return (
    <>
      <Link onClick={() => saveForm(form)}>
        {t("form_builder.save")}
        <FloppydiskFillIcon className={classes.subHeaderIcon} />
      </Link>
      {form.status.toLowerCase() === "draft" && (
        <Link onClick={() => saveForm(form, true)}>
          {t("form_builder.publish")}
          <TasklistSendFillIcon className={classes.subHeaderIcon} />
        </Link>
      )}
    </>
  );
};

import React, { useContext } from "react";
import { FormBuilderContext } from "../../../../form-builder/src/context";
import { Link, Paragraph } from "@digdir/design-system-react";
import { t } from "i18next";
import { FloppydiskFillIcon, TasklistSendFillIcon } from "@navikt/aksel-icons";
import { saveForm } from "./utils";
import classes from "./SubHeader.module.css";

export const FormBuilderLinks = () => {
  const { form } = useContext(FormBuilderContext);
  const statusUpperFirstLetter = form?.status?.charAt(0).toUpperCase() + form?.status?.slice(1);

  if (!form) return;

  return (
    <>
      <Paragraph
        size={"small"}
        className={classes.statusText}
      >{`Status: ${statusUpperFirstLetter}`}</Paragraph>
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

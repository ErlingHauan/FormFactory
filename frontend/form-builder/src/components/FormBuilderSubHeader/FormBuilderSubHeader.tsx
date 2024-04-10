import React, { useContext } from "react";
import classes from "./FormBuilderSubHeader.module.css";
import { Heading, Link } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TasklistSendFillIcon } from "@navikt/aksel-icons";
import { t } from "i18next";
import { FormBuilderContext } from "../../app/App";
import { saveForm } from "./utils";

export const FormBuilderSubHeader: React.FC = () => {
  return (
    <div className={classes.subHeader}>
      <Heading className={classes.subHeaderHeading} level={2} size="xxsmall">
        {t("form_builder")}
      </Heading>
      <div className={classes.subHeaderLinks}>
        <FormBuilderLinks />
      </div>
    </div>
  );
};

const FormBuilderLinks = () => {
  const { form } = useContext(FormBuilderContext);

  return (
    <>
      <Link onClick={() => saveForm(form)}>
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

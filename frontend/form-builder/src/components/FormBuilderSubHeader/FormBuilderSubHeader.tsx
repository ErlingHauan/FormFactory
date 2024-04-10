import React, { useContext } from "react";
import classes from "./FormBuilderSubHeader.module.css";
import { Heading, Link } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TasklistSendFillIcon } from "@navikt/aksel-icons";
import { t } from "i18next";
import axios from "axios";
import { FormBuilderContext } from "../../app/App";
import { getApiUrl } from "../../../../main-app/src/utils/getApiUrl";

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

  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms`;

  const saveForm = async () => {
    try {
      await axios.put(targetUrl, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("The form has been saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link onClick={saveForm}>
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

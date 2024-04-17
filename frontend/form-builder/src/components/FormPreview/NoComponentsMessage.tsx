import classes from "./FormPreview.module.css";
import { ComponentIcon } from "@navikt/aksel-icons";
import { Paragraph } from "@digdir/design-system-react";
import React from "react";
import { useTranslation } from "react-i18next";

export const NoComponentsMessage = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.noComponents}>
      <ComponentIcon className={classes.noComponentsIcon} />
      <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
    </div>
  );
};

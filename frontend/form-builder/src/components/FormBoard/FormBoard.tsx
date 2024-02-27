import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";
import { useTranslation } from "react-i18next";

export const FormBoard = (): React.JSX.Element => {
  const form = [];
  const { t } = useTranslation();

  return (
    <>
      <Heading level={2} size="medium" spacing>
        {t("form_builder")}
      </Heading>
      {form.length < 1 && (
        <div className={classes.noComponents}>
          <ComponentIcon className={classes.noComponentsIcon} />
          <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
        </div>
      )}
    </>
  );
};

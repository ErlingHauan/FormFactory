import React from "react";
import classes from "./SettingsSidebar.module.css";
import { Heading, Textfield } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

export const SettingsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Heading level={2} size="medium" spacing>
        {t("settings_side_bar")}
      </Heading>
      <Textfield
        label={t("settings_side_bar.component.label")}
        size="small"
        className={classes.spacing}
      />
      <Textfield
        label={t("settings_side_bar.minimum.lenght")}
        size="small"
        className={classes.spacing}
      />
      <Textfield
        label={t("settings_side_bar.maximum.lenght")}
        size="small"
        className={classes.spacing}
      />
    </>
  );
};

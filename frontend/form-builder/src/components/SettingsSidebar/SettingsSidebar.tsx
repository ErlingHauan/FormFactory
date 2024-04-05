import React from "react";
import classes from "./SettingsSidebar.module.css";
import { Heading, Textfield } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

export const SettingsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.settingsHeading}>
        <Heading level={3} size="xxsmall">
          {t("settings_side_bar")}
        </Heading>
      </div>
      <div className={classes.settingsContent}>
        <Textfield
          label={t("settings_side_bar.component.label")}
          size="small"
          className={classes.spacing}
        />
        <Textfield
          label={t("settings_side_bar.minimum.length")}
          size="small"
          className={classes.spacing}
        />
        <Textfield
          label={t("settings_side_bar.maximum.length")}
          size="small"
          className={classes.spacing}
        />
      </div>
    </>
  );
};

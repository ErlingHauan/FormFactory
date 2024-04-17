import React from "react";
import { Heading } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";
import classes from "./FormSettings.module.css";

interface SettingsSidebarProps {
  SettingsContent: () => React.JSX.Element;
}

export const SettingsSidebar = ({ SettingsContent }: SettingsSidebarProps): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Heading level={3} size="xxsmall" className={classes.settingsHeading}>
        {t("settings_side_bar")}
      </Heading>
      <SettingsContent />
    </>
  );
};

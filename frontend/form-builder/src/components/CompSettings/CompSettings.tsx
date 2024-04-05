import { Textfield } from "@digdir/design-system-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { CompSettingsModal } from "./CompSettingsModal";
import { CompSettingsSidebar } from "./CompSettingsSideBar";
import classes from "./CompSettings.module.css";

interface CompSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const CompSettings = ({
  isSmallScreen,
  settingsRef,
}: CompSettingsProps): React.JSX.Element => {
  const { t } = useTranslation();

  const SettingsContent = () => {
    return (
      <div className={classes.compSettingsContent}>
        <Textfield label={t("settings_side_bar.component.label")} size="small" />
        <Textfield label={t("settings_side_bar.minimum.length")} size="small" />
        <Textfield label={t("settings_side_bar.maximum.length")} size="small" />
      </div>
    );
  };

  return isSmallScreen ? (
    <CompSettingsModal SettingsContent={SettingsContent} settingsRef={settingsRef} />
  ) : (
    <CompSettingsSidebar SettingsContent={SettingsContent} />
  );
};

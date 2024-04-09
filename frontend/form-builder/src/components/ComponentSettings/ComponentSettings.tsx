import React, { useContext } from "react";
import { SettingsModal } from "./SettingsModal";
import { CompSettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const ComponentSettings = ({
  isSmallScreen,
  settingsRef,
}: ComponentSettingsProps): React.JSX.Element => {
  const SettingsContent = () => {
    const { currentComponent } = useContext(FormBuilderContext);

    return (
      <div className={classes.compSettingsContent}>
        <p>Order: {currentComponent?.order}</p>
        {currentComponent?.type === "input" && <InputSettings />}
        {currentComponent?.type === "radio" && <RadioSettings />}
      </div>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={SettingsContent} settingsRef={settingsRef} />
  ) : (
    <CompSettingsSidebar SettingsContent={SettingsContent} />
  );
};

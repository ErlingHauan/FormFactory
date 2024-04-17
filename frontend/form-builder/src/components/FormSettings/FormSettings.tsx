import React, { useContext } from "react";
import { SettingsModal } from "./SettingsModal";
import { SettingsSidebar } from "./SettingsSidebar";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";
import { FormBuilderContext } from "../../context";
import { HeadingSettings } from "./HeadingSettings";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const FormSettings = ({ isSmallScreen }: ComponentSettingsProps): React.JSX.Element => {
  const { selectedItem } = useContext(FormBuilderContext);

  const SettingsContent = () => {
    return (
      <>
        {selectedItem?.type === "heading" && <HeadingSettings />}
        {selectedItem?.type === "input" && <InputSettings />}
        {selectedItem?.type === "radio" && <RadioSettings />}
      </>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={SettingsContent} />
  ) : (
    <SettingsSidebar SettingsContent={SettingsContent} />
  );
};

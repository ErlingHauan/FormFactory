import React, { FormEvent, useContext } from "react";
import { SettingsModal } from "./SettingsModal";
import { CompSettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const ComponentSettings = ({
  isSmallScreen,
  settingsRef,
}: ComponentSettingsProps): React.JSX.Element => {
  const SettingsContent = () => {
    const { currentComponent, form, setForm } = useContext(FormBuilderContext);

    const handleSaveComponent = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const cleanedFormData = cleanFormData(formData);

      // check for boolean or number fields and convert them from strings

      let updatedItem = { ...currentComponent, ...cleanedFormData };
      const index = currentComponent.order;
      let updatedComponents = form.components;
      updatedComponents[index] = updatedItem;
      setForm({ ...form, components: updatedComponents });
    };

    return (
      <form className={classes.compSettingsContent} onSubmit={handleSaveComponent}>
        {currentComponent?.type === "input" && <InputSettings />}
        {currentComponent?.type === "radio" && <RadioSettings />}
      </form>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={SettingsContent} settingsRef={settingsRef} />
  ) : (
    <CompSettingsSidebar SettingsContent={SettingsContent} />
  );
};

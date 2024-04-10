import React, { FormEvent, useContext } from "react";
import { SettingsModal } from "./SettingsModal";
import { SettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";
import { ComponentAsStrings } from "./types";
import { updateComponent, updateComponentArray } from "./utils";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const ComponentSettings = ({
  isSmallScreen,
  settingsRef,
}: ComponentSettingsProps): React.JSX.Element => {
  const { currentComponent, setCurrentComponent, form, setForm } = useContext(FormBuilderContext);

  const handleSaveComponent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const updatedComponentData = cleanFormData(formData) as ComponentAsStrings;

    // TODO: Use Zod validation here.
    // See FormViewer for an example of how it can be done.

    const updatedComponent: FormComponent = updateComponent(currentComponent, updatedComponentData);
    const updatedComponents: FormComponent[] = updateComponentArray(
      form.components,
      updatedComponent,
    );

    setForm({ ...form, components: updatedComponents });
    setCurrentComponent(null);
  };

  const RenderSettingsContent = () => {
    return (
      <form className={classes.SettingsContent} onSubmit={handleSaveComponent}>
        {currentComponent?.type === "input" && <InputSettings />}
        {currentComponent?.type === "radio" && <RadioSettings />}
      </form>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={RenderSettingsContent} settingsRef={settingsRef} />
  ) : (
    <SettingsSidebar SettingsContent={RenderSettingsContent} />
  );
};

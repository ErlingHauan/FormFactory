import React, { FormEvent, useContext } from "react";
import { SettingsModal } from "./SettingsModal";
import { SettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";
import { ComponentAsStrings } from "./types";
import { updateComponent, updateComponentArray } from "./utils";
import { FormBuilderContext } from "../../context";
import { HeadingSettings } from "./HeadingSettings";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const ComponentSettings = ({ isSmallScreen }: ComponentSettingsProps): React.JSX.Element => {
  const { selectedItem, setSelectedItem, form, setForm } = useContext(FormBuilderContext);

  const handleSaveComponent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const updatedComponentData = cleanFormData(formData) as ComponentAsStrings;

    // TODO: Use Zod validation here.
    // See FormViewer for an example of how it can be done.

    const updatedComponent: FormComponent = updateComponent(selectedItem, updatedComponentData);
    const updatedComponents: FormComponent[] = updateComponentArray(
      form.components,
      updatedComponent,
    );

    setForm({ ...form, components: updatedComponents });
    setSelectedItem(null);
  };

  const RenderSettingsContent = () => {
    return (
      <form className={classes.SettingsContent} onSubmit={handleSaveComponent}>
        {selectedItem?.type === "heading" && <HeadingSettings />}
        {selectedItem?.type === "input" && <InputSettings />}
        {selectedItem?.type === "radio" && <RadioSettings />}
      </form>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={RenderSettingsContent} />
  ) : (
    <SettingsSidebar SettingsContent={RenderSettingsContent} />
  );
};

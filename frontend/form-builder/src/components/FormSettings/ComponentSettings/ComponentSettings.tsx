import React, { FormEvent, useContext } from "react";
import { ComponentButtons } from "./ComponentButtons";
import { FormBuilderContext } from "../../../context";
import classes from "../FormSettings.module.css";
import { updateComponent, updateComponentArray } from "../utils";
import { cleanFormData } from "../../../../../main-app/src/components/FormViewer/validationUtils";
import { ComponentAsStrings } from "../types";
import { InputSettings } from "./InputSettings";
import { RadioSettings } from "./RadioSettings";

export const ComponentSettings = () => {
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

  return (
    <>
      <form className={classes.settingsContent} onSubmit={handleSaveComponent}>
        {selectedItem.type == "input" && <InputSettings />}
        {selectedItem.type == "radio" && <RadioSettings />}
        <ComponentButtons />
      </form>
    </>
  );
};

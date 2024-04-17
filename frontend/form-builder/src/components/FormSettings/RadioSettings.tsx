import React, { FormEvent, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { ButtonGroup } from "./ButtonGroup";
import { FormBuilderContext } from "../../context";
import classes from "./FormSettings.module.css";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";
import { ComponentAsStrings } from "./types";
import { updateComponent, updateComponentArray } from "./utils";

export const RadioSettings = () => {
  const { selectedItem, setSelectedItem, form, setForm } = useContext(FormBuilderContext);
  const { t } = useTranslation();

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
      <form className={classes.SettingsContent} onSubmit={handleSaveComponent}>
        <Textfield name="name" label="Name" defaultValue={selectedItem.name} size="small" />
        <Textfield
          name="label"
          label={t("settings_side_bar.component.label")}
          defaultValue={selectedItem.label || ""}
          size="small"
        />
        <Textarea
          name="radioChoices"
          label={t("settings_side_bar.radio.choices")}
          defaultValue={selectedItem.radioChoices?.join(", ") || ""}
          size="small"
        />
        <ButtonGroup />
      </form>
    </>
  );
};

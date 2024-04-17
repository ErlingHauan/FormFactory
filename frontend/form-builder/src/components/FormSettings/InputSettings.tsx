import { useTranslation } from "react-i18next";
import React, { FormEvent, useContext, useState } from "react";
import { Checkbox, Radio, Textfield } from "@digdir/design-system-react";
import { ButtonGroup } from "./ButtonGroup";
import { FormBuilderContext } from "../../context";
import classes from "./FormSettings.module.css";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";
import { ComponentAsStrings } from "./types";
import { updateComponent, updateComponentArray } from "./utils";

export const InputSettings = () => {
  const { t } = useTranslation();
  const { selectedItem, setSelectedItem, form, setForm } = useContext(FormBuilderContext);
  const [inputType, setInputType] = useState(selectedItem.inputType || "string");

  const handleInputFormat = (value: string) => {
    setInputType(value as "string" | "number");
  };

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
        <Textfield
          name="name"
          label={t("settings_side_bar.component.name")}
          defaultValue={selectedItem.name || ""}
          size="small"
          placeholder={"Required"}
        />
        <Textfield
          name="label"
          label={t("settings_side_bar.component.label")}
          defaultValue={selectedItem.label || ""}
          size="small"
          placeholder={"Required"}
        />
        <Checkbox
          name="required"
          size="small"
          value="required"
          defaultChecked={selectedItem.required}
        >
          {t("settings_side_bar.require.response")}
        </Checkbox>
        <Radio.Group
          name="inputType"
          defaultValue={selectedItem.inputType || inputType}
          size="small"
          legend={t("settings_side_bar.input.format")}
          onChange={handleInputFormat}
        >
          <Radio value="string">{t("settings_side_bar.text")}</Radio>
          <Radio value="number">{t("settings_side_bar.number")}</Radio>
        </Radio.Group>
        {inputType === "string" && <TextSettings />}
        {inputType === "number" && <NumberSettings />}
        <ButtonGroup />
      </form>
    </>
  );
};

const TextSettings = () => {
  const { t } = useTranslation();
  const { selectedItem } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        name="minLength"
        label={t("settings_side_bar.minimum.length")}
        defaultValue={selectedItem.minLength || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        name="maxLength"
        label={t("settings_side_bar.maximum.length")}
        defaultValue={selectedItem.maxLength || ""}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

const NumberSettings = () => {
  const { t } = useTranslation();
  const { selectedItem } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        name="greaterThan"
        label={t("settings_side_bar.minimum.value")}
        defaultValue={selectedItem.greaterThan || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        name="lessThan"
        label={t("settings_side_bar.maximum.value")}
        defaultValue={selectedItem.lessThan || ""}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

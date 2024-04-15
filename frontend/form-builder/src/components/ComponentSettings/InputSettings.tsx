import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import { Checkbox, Radio, Textfield } from "@digdir/design-system-react";
import { ButtonGroup } from "./ButtonGroup";
import { FormBuilderContext } from "../../context";

export const InputSettings = () => {
  const { t } = useTranslation();
  const { currentComponent } = useContext(FormBuilderContext);
  const [inputType, setInputType] = useState(currentComponent.inputType || "string");

  const handleInputFormat = (value: string) => {
    setInputType(value as "string" | "number");
  };

  return (
    <>
      <Textfield
        name="name"
        label={t("settings_side_bar.component.name")}
        defaultValue={currentComponent.name || ""}
        size="small"
        placeholder={"Required"}
      />
      <Textfield
        name="label"
        label={t("settings_side_bar.component.label")}
        defaultValue={currentComponent.label || ""}
        size="small"
        placeholder={"Required"}
      />
      <Checkbox
        name="required"
        size="small"
        value="required"
        defaultChecked={currentComponent.required}
      >
        {t("settings_side_bar.require.response")}
      </Checkbox>
      <Radio.Group
        name="inputType"
        defaultValue={currentComponent.inputType || inputType}
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
    </>
  );
};

const TextSettings = () => {
  const { t } = useTranslation();
  const { currentComponent } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        name="minLength"
        label={t("settings_side_bar.minimum.length")}
        defaultValue={currentComponent.minLength || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        name="maxLength"
        label={t("settings_side_bar.maximum.length")}
        defaultValue={currentComponent.maxLength || ""}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

const NumberSettings = () => {
  const { t } = useTranslation();
  const { currentComponent } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        name="greaterThan"
        label={t("settings_side_bar.minimum.value")}
        defaultValue={currentComponent.greaterThan || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        name="lessThan"
        label={t("settings_side_bar.maximum.value")}
        defaultValue={currentComponent.lessThan || ""}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

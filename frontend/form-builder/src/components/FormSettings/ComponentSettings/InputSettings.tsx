import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import { Checkbox, Radio, Textfield } from "@digdir/design-system-react";
import { FormBuilderContext } from "../../../context";
import { TextSettings } from "./TextSettings";
import { NumberSettings } from "./NumberSettings";

export const InputSettings = () => {
  const { t } = useTranslation();
  const { selectedItem } = useContext(FormBuilderContext);
  const [inputType, setInputType] = useState(selectedItem.inputType || "string");

  const handleInputFormat = (value: string) => {
    setInputType(value as "string" | "number");
  };

  return (
    <>
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
    </>
  );
};

import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { Checkbox, Radio, Textfield } from "@digdir/design-system-react";
import { FormBuilderContext } from "../../../context";
import { TextSettings } from "./TextSettings";
import { NumberSettings } from "./NumberSettings";

export const InputSettings = () => {
  const { t } = useTranslation();
  const { name, label = "", required, inputType } = useContext(FormBuilderContext).selectedItem;
  const [inputFormat, setInputFormat] = React.useState(inputType || "string");

  const handleInputFormat = (value: string) => {
    setInputFormat(value as "string" | "number");
  };

  return (
    <>
      <Textfield
        name="name"
        label={t("settings_side_bar.component.name")}
        defaultValue={name}
        size="small"
        placeholder={"Required"}
      />
      <Textfield
        name="label"
        label={t("settings_side_bar.component.label")}
        defaultValue={label}
        size="small"
        placeholder={"Required"}
      />
      <Checkbox name="required" size="small" value="required" defaultChecked={required}>
        {t("settings_side_bar.require.response")}
      </Checkbox>
      <Radio.Group
        name="inputType"
        defaultValue={inputFormat}
        size="small"
        legend={t("settings_side_bar.input.format")}
        onChange={handleInputFormat}
      >
        <Radio value="string">{t("settings_side_bar.text")}</Radio>
        <Radio value="number">{t("settings_side_bar.number")}</Radio>
      </Radio.Group>
      {inputFormat === "string" && <TextSettings />}
      {inputFormat === "number" && <NumberSettings />}
    </>
  );
};

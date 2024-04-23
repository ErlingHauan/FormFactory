import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { FormBuilderContext } from "../../../context";

export const RadioSettings = () => {
  const { name, label = "", radioChoices } = useContext(FormBuilderContext).selectedItem;
  const { t } = useTranslation();

  return (
    <>
      <Textfield name="name" label="Name" defaultValue={name} size="small" />
      <Textfield
        name="label"
        label={t("settings_side_bar.component.label")}
        defaultValue={label}
        size="small"
      />
      <Textarea
        name="radioChoices"
        label={t("settings_side_bar.radio.choices")}
        defaultValue={radioChoices?.join(", ") || ""}
        size="small"
      />
    </>
  );
};

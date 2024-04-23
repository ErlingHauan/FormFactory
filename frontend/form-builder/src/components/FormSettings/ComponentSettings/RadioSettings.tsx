import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { FormBuilderContext } from "../../../context";

export const RadioSettings = () => {
  const { selectedItem } = useContext(FormBuilderContext);
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

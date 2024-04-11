import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { ButtonGroup } from "./ButtonGroup";
import { FormBuilderContext } from "../../context";

export const RadioSettings = () => {
  const { currentComponent } = useContext(FormBuilderContext);
  const { t } = useTranslation();

  return (
    <>
      <Textfield name="name" label="Name" defaultValue={currentComponent.name} size="small" />
      <Textfield
        name="label"
        label={t("settings_side_bar.component.label")}
        defaultValue={currentComponent.label || ""}
        size="small"
      />
      <Textarea
        name="radioChoices"
        label={t("settings_side_bar.radio.choices")}
        defaultValue={currentComponent.radioChoices?.join(", ") || ""}
        size="small"
      />
      <ButtonGroup />
    </>
  );
};

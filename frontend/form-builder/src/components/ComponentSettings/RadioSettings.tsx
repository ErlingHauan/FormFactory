import React, { useContext } from "react";
import { FormBuilderContext } from "../../app/App";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { ButtonGroup } from "./ButtonGroup";

export const RadioSettings = () => {
  const { currentComponent } = useContext(FormBuilderContext);
  const { t } = useTranslation();

  return (
    <>
      <Textfield label="Name" defaultValue={currentComponent.name} size="small" />
      <Textfield
        label={t("settings_side_bar.component.label")}
        defaultValue={currentComponent.label || ""}
        size="small"
      />
      <Textarea
        label={"Choices (comma separated)"}
        defaultValue={currentComponent.radioChoices?.join(", ") || ""}
        size="small"
      />
      <ButtonGroup />
    </>
  );
};

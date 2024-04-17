import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Textfield } from "@digdir/design-system-react";
import { ComponentButtons } from "./ComponentButtons";
import { FormBuilderContext } from "../../context";
import classes from "./FormSettings.module.css";
import { saveComponent } from "./utils";

export const RadioSettings = () => {
  const { selectedItem, setSelectedItem, form, setForm } = useContext(FormBuilderContext);
  const { t } = useTranslation();

  const saveComponentConfig = {
    selectedItem,
    form,
    setForm,
    setSelectedItem,
  };

  return (
    <>
      <form
        className={classes.settingsContent}
        onSubmit={(e) => saveComponent(e, saveComponentConfig)}
      >
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
        <ComponentButtons />
      </form>
    </>
  );
};

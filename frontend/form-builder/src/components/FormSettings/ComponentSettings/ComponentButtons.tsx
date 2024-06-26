import React, { useContext } from "react";
import classes from "../FormSettings.module.css";
import { Button } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { FormBuilderContext } from "../../../context";
import { validateOrder } from "../../../../../main-app/src/components/SubHeader/utils";
import { useTranslation } from "react-i18next";

export const ComponentButtons = () => {
  const { t } = useTranslation();
  const { form, setForm, selectedItem, setSelectedItem } = useContext(FormBuilderContext);

  const handleDeleteComponent = (index: number) => {
    const newForm: Form = { ...form, components: form.components.filter((_, i) => i !== index) };
    validateOrder(newForm);

    setForm({ ...newForm });
    setSelectedItem(null);
  };

  return (
    <div className={classes.buttonContainer}>
      <Button
        type="button"
        color={"danger"}
        variant={"secondary"}
        size={"small"}
        onClick={() => handleDeleteComponent(selectedItem.order)}
      >
        <TrashFillIcon />
        {t("settings_side_bar.delete.component")}
      </Button>
      <Button type="submit" color={"success"} size={"small"}>
        <FloppydiskFillIcon />
        {t("settings_side_bar.save.component")}
      </Button>
    </div>
  );
};

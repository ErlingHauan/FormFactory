import React, { useContext } from "react";
import classes from "./ComponentSettings.module.css";
import { Button } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { FormBuilderContext } from "../../context";
import { validateOrder } from "../../../../main-app/src/components/SubHeader/utils";

export const ButtonGroup = () => {
  const { form, setForm, currentComponent, setCurrentComponent } = useContext(FormBuilderContext);

  const handleDeleteComponent = (index: number) => {
    const newForm = form;
    newForm.components = form.components.filter((_, i) => i !== index);
    validateOrder(newForm);

    setForm({ ...form, ...newForm });
    setCurrentComponent(null);
  };

  return (
    <div className={classes.buttons}>
      <Button
        type="button"
        color={"danger"}
        variant={"secondary"}
        size={"small"}
        onClick={() => handleDeleteComponent(currentComponent.order)}
      >
        <TrashFillIcon />
        Delete component
      </Button>
      <Button type="submit" color={"success"} size={"small"}>
        <FloppydiskFillIcon />
        Save component
      </Button>
    </div>
  );
};

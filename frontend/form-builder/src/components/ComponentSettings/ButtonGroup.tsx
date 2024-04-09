import React, { useContext } from "react";
import { FormBuilderContext } from "../../app/App";
import classes from "./ComponentSettings.module.css";
import { Button } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TrashFillIcon } from "@navikt/aksel-icons";

export const ButtonGroup = () => {
  const { currentComponent, form, setForm } = useContext(FormBuilderContext);
  const handleSave = () => {
    const index = currentComponent.order;
    let updatedComponents = form.components;
    updatedComponents[index] = currentComponent;

    setForm({ ...form, components: updatedComponents });
  };

  return (
    <div className={classes.buttons}>
      <Button color={"danger"} variant={"secondary"} size={"small"}>
        <TrashFillIcon />
        Delete component
      </Button>
      <Button color={"success"} size={"small"} onClick={handleSave}>
        <FloppydiskFillIcon />
        Save component
      </Button>
    </div>
  );
};

import React from "react";
import classes from "./ComponentSettings.module.css";
import { Button } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TrashFillIcon } from "@navikt/aksel-icons";

export const ButtonGroup = () => {
  // const handleSave = () => {
  //   const index = currentComponent.order;
  //   let updatedComponents = form.components;
  //   updatedComponents[index] = currentComponent;
  //
  //   setForm({ ...form, components: updatedComponents });
  // };

  return (
    <div className={classes.buttons}>
      <Button type="button" color={"danger"} variant={"secondary"} size={"small"}>
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

import React from "react";
import { Paragraph } from "@digdir/design-system-react";
import classes from "./FormSettings.module.css";

export const NoSelectedItem = () => {
  return (
    <div className={classes.noSelectedItem}>
      <Paragraph>No item selected</Paragraph>
    </div>
  );
};

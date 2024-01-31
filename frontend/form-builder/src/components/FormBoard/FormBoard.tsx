import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import classes from "./FormBoard.module.css";

export const FormBoard = (): React.JSX.Element => {
  return (
    <div className={classes.FormBoard}>
      <Heading level={2}>Form</Heading>
      <Paragraph>Drag components here</Paragraph>
    </div>
  );
};

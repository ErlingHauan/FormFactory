import { Heading } from "@digdir/design-system-react";
import React from "react";
import classes from "./Toolbar.module.css";

export const Toolbar = (): React.JSX.Element => {
  return (
    <div className={classes.toolbar}>
      <Heading level={2}>Toolbar</Heading>
      <ul>
        <li>Textfield</li>
        <li>Radio</li>
      </ul>
    </div>
  );
};

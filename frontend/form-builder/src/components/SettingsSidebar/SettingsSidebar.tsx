import React from "react";
import classes from "./SettingsSidebar.module.css";
import { Heading } from "@digdir/design-system-react";

export const SettingsSidebar = (): React.JSX.Element => {
  return (
    <div className={classes.sidebar}>
      <Heading level={2}>Settings</Heading>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
    </div>
  );
};

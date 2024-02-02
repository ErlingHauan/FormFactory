import React from "react";
import classes from "./SettingsSidebar.module.css";
import { Heading, Textfield } from "@digdir/design-system-react";

export const SettingsSidebar = (): React.JSX.Element => {
  return (
    <div className={classes.sidebar}>
      <Heading level={2} size="medium" spacing>Settings</Heading>
      <Textfield label="Component name" size="small" className={classes.spacing}/>
      <Textfield label="Minimum length" size="small" className={classes.spacing}/>
      <Textfield label="Maximum length" size="small" className={classes.spacing}/>
    </div>
  );
};

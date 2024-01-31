import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar/";
import { FormBoard } from "../components/FormBoard/";
import { SettingsSidebar } from "../components/SettingsSidebar/";

export const App = (): React.JSX.Element => {
  return (
    <>
      <main className={classes.main}>
        <Toolbar />
        <FormBoard />
        <SettingsSidebar />
      </main>
    </>
  );
};

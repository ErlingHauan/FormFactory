import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar/";
import { FormBoard } from "../components/FormBoard/";
import { SettingsSidebar } from "../components/SettingsSidebar/";
import { Heading } from "@digdir/design-system-react";

export const App = (): React.JSX.Element => {
  return (
      <main className={classes.main}>
        <Heading level={1} spacing>
          Form Builder
        </Heading>
        <div className={classes.builderGrid}>
          <Toolbar />
          <FormBoard />
          <SettingsSidebar />
        </div>
      </main>
  );
};

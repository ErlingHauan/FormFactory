import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormPreview } from "../components/FormPreview";
import { SettingsSidebar } from "../components/SettingsSidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = (): React.JSX.Element => {
  return (
    <div className={classes.formBuilder}>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.builderSection}>
          <Toolbar />
        </div>
        <div className={classes.builderSection}>
          <FormPreview />
        </div>
      </DndProvider>
      <div className={classes.builderSection}>
        <SettingsSidebar />
      </div>
    </div>
  );
};

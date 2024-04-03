import React, { useState } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormBoard } from "../components/FormBoard";
import { SettingsSidebar } from "../components/SettingsSidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = (): React.JSX.Element => {
  const [formComponents, setFormComponents] = useState<FormComponent[]>([]);

  return (
    <div className={classes.formBuilder}>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.builderSection}>
          <Toolbar />
        </div>
        <div className={classes.builderSection}>
          <FormBoard formComponents={formComponents} setFormComponents={setFormComponents} />
        </div>
      </DndProvider>
      <div className={classes.builderSection}>
        <SettingsSidebar />
      </div>
    </div>
  );
};

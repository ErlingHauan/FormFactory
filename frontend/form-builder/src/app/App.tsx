import React, { createContext, useEffect, useRef, useState } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormPreview } from "../components/FormPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuthorization } from "../../../main-app/src/hooks/useAuthorization";
import { CompSettings } from "../components/CompSettings";

export const ComponentContext = createContext(null);

export const App = (): React.JSX.Element => {
  const [formComponents, setFormComponents] = useState<FormComponent[]>([]);
  useAuthorization();
  const settingsRef = useRef<HTMLDialogElement>(null);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const isSmallScreen = windowSize < 768;

  const [currentComponent, setCurrentComponent] = useState<FormComponent | null>();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ComponentContext.Provider
      value={{
        formComponents,
        setFormComponents,
        currentComponent,
        setCurrentComponent,
      }}
    >
      <div className={classes.formBuilder}>
        <DndProvider backend={HTML5Backend}>
          <div className={classes.builderSection}>
            <Toolbar />
          </div>
          <div className={classes.builderSection}>
            <FormPreview
              settingsRef={settingsRef}
              formComponents={formComponents}
              setFormComponents={setFormComponents}
            />
          </div>
        </DndProvider>
        <div className={isSmallScreen ? classes.builderModal : classes.builderSection}>
          <CompSettings isSmallScreen={isSmallScreen} settingsRef={settingsRef} />
        </div>
      </div>
    </ComponentContext.Provider>
  );
};

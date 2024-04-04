import React, { useEffect, useRef } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormBoard } from "../components/FormBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuthorization } from "../../../main-app/src/hooks/useAuthorization";
import { CompSettings } from "../components/CompSettings";

export const App = (): React.JSX.Element => {
  useAuthorization();
  const settingsRef = useRef<HTMLDialogElement>(null);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const isSmallScreen = windowSize < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={classes.formBuilder}>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.builderSection}>
          <Toolbar />
        </div>
        <div className={classes.builderSection}>
          <FormBoard settingsRef={settingsRef} />
        </div>
      </DndProvider>
      <div className={isSmallScreen ? classes.builderModal : classes.builderSection}>
        <CompSettings isSmallScreen={isSmallScreen} settingsRef={settingsRef} />
      </div>
    </div>
  );
};

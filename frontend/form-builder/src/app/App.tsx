import React, { useContext, useEffect, useRef } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormPreview } from "../components/FormPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuthorization } from "../../../main-app/src/hooks/useAuthorization";
import { ComponentSettings } from "../components/ComponentSettings";
import { useGetForm } from "../hooks/useGetForm";
import { NotFound } from "../../../main-app/src/components/NotFound";
import { FormBuilderSubHeader } from "../components/FormBuilderSubHeader";
import { FormBuilderContext } from "../context";

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

  const fetchedForm = useGetForm();
  const { form, setForm } = useContext(FormBuilderContext);

  useEffect(() => {
    setForm(fetchedForm);
  }, [fetchedForm, setForm]);

  const RenderFormBuilder = () => (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderSubHeader />
      <div className={classes.formBuilder}>
        <div className={classes.builderSection}>
          <Toolbar />
        </div>
        <div className={classes.builderSection}>
          <FormPreview settingsRef={settingsRef} />
        </div>
        <div className={isSmallScreen ? classes.builderModal : classes.builderSection}>
          <ComponentSettings isSmallScreen={isSmallScreen} settingsRef={settingsRef} />
        </div>
      </div>
    </DndProvider>
  );

  return <>{form ? <RenderFormBuilder /> : <NotFound />}</>;
};

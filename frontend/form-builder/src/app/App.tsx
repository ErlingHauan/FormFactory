import React, { createContext, useEffect, useRef, useState } from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormPreview } from "../components/FormPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuthorization } from "../../../main-app/src/hooks/useAuthorization";
import { CompSettings } from "../components/CompSettings";
import { useGetForm } from "../hooks/useGetForm";

// ✅ When going to /form-builder/new, a new form should be created by contacting /api/forms with POST. Use the returned form ID to redirect.
// ✅ Redirect to /form-builder/form-id. Get the newly created form from /api/forms/{formId} and store in a state.
// ✅ The frontend should store a 1:1 copy of the backend format of the form.
// Display the title, description and components from the form in the form builder.
// Use PUT on endpoint /api/forms to store the changed data.

export const FormBuilderContext = createContext(null);

export const App = (): React.JSX.Element => {
  const [formComponents, setFormComponents] = useState<FormComponent[]>([]);
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

  // This PR
  const { form, setForm } = useGetForm();
  const [currentComponent, setCurrentComponent] = useState<FormComponent | null>();

  return (
    <FormBuilderContext.Provider
      value={{
        form,
        setForm,
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
    </FormBuilderContext.Provider>
  );
};

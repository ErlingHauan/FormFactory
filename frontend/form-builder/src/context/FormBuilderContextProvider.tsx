import React, { useState } from "react";
import { FormBuilderContext } from "./FormBuilderContext";

interface FormBuilderContextProviderProps {
  children: React.ReactNode;
}

export const FormBuilderContextProvider = ({ children }: FormBuilderContextProviderProps) => {
  const [currentComponent, setCurrentComponent] = useState<FormComponent | null>();
  const [form, setForm] = useState<Form | null>();
  return (
    <FormBuilderContext.Provider
      value={{
        form,
        setForm,
        currentComponent,
        setCurrentComponent,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

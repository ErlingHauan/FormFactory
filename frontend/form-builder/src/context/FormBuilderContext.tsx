import React, { createContext } from "react";

interface FormBuilderContextTypes {
  form?: Form;
  setForm?: React.Dispatch<React.SetStateAction<Form>>;
  currentComponent?: FormComponent;
  setCurrentComponent?: React.Dispatch<React.SetStateAction<FormComponent>>;
}

export const FormBuilderContext = createContext<FormBuilderContextTypes>(null);
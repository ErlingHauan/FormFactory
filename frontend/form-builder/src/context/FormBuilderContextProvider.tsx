import React, { useRef, useState } from "react";
import { FormBuilderContext, FormItem } from "./FormBuilderContext";

interface FormBuilderContextProviderProps {
  children: React.ReactNode;
}

export const FormBuilderContextProvider = ({ children }: FormBuilderContextProviderProps) => {
  const [selectedItem, setSelectedItem] = useState<FormItem | null>();
  const [form, setForm] = useState<Form | null>();
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <FormBuilderContext.Provider
      value={{
        form,
        setForm,
        selectedItem,
        setSelectedItem,
        modalRef,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

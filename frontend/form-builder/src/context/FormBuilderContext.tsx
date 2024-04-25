import React, { createContext } from "react";

export interface FormItem extends FormComponent {
  title?: string;
  description?: string;
}

interface FormBuilderContextTypes {
  form?: Form;
  setForm?: React.Dispatch<React.SetStateAction<Form>>;
  selectedItem?: FormItem;
  setSelectedItem?: React.Dispatch<React.SetStateAction<FormItem>>;
  modalRef?: React.MutableRefObject<HTMLDialogElement>;
}

export const FormBuilderContext = createContext<FormBuilderContextTypes>(null);

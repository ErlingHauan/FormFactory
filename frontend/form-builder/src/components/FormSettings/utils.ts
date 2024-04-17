import { ComponentAsStrings } from "./types";
import { FormEvent } from "react";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";

// Updated component data from HTML inputs is submitted in strings, and has to be converted into their proper value
// The original values for 'order' and 'type' is kept, as they are currently not changed in the settings
export const updateComponent = (
  currentComponent: FormComponent,
  newData: ComponentAsStrings,
): FormComponent => {
  return {
    order: currentComponent.order,
    type: currentComponent.type,
    name: newData.name,
    label: newData.label,
    inputType: newData.inputType,
    required: Boolean(newData.required),
    minLength: Number(newData.minLength),
    maxLength: Number(newData.maxLength),
    greaterThan: Number(newData.greaterThan),
    lessThan: Number(newData.lessThan),
    radioChoices: newData.radioChoices?.split(", "),
  };
};

export const updateComponentArray = (
  components: FormComponent[],
  updatedComponent: FormComponent,
): FormComponent[] => {
  const index = updatedComponent.order;
  const updatedComponents = [...components];
  updatedComponents[index] = updatedComponent;
  return updatedComponents;
};

interface HandleSaveComponentConfig {
  selectedItem: FormComponent;
  form: Form;
  setForm: (form: Form) => void;
  setSelectedItem: (item: FormComponent | null) => void;
}

export const saveComponent = (
  event: FormEvent<HTMLFormElement>,
  config: HandleSaveComponentConfig,
) => {
  event.preventDefault();

  const { selectedItem, form, setForm, setSelectedItem } = config;

  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const updatedComponentData = cleanFormData(formData) as ComponentAsStrings;

  // TODO: Use Zod validation here.
  // See FormViewer for an example of how it can be done.

  const updatedComponent: FormComponent = updateComponent(selectedItem, updatedComponentData);
  const updatedComponents: FormComponent[] = updateComponentArray(
    form.components,
    updatedComponent,
  );

  setForm({ ...form, components: updatedComponents });
  setSelectedItem(null);
};

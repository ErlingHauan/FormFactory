import { ComponentAsStrings } from "./types";

// Updated component data from HTML inputs is submitted in strings
// They need to be converted into their proper value
// Additionally, the original values of order and type is kept
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

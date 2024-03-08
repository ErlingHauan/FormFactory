import classes from "./FormComponents.module.css";
import { FormTextfield } from "../FormTextfield";
import { FormRadio } from "../FormRadio";
import React from "react";

interface FormComponentsProps {
  components: FormComponent[];
  errors: Record<string, string[]>;
}
export const FormComponents: React.FC<FormComponentsProps> = ({
  components,
  errors,
}): React.JSX.Element => {
  return (
    <>
      {components.map((component: FormComponent) => {
        const { componentType, name, label, required, choices } = component;

        return componentType === "textfield" ? (
          <div key={name} className={classes.component}>
            <FormTextfield name={name} label={label} required={required} error={errors?.[name]} />
          </div>
        ) : (
          <div key={name} className={classes.component}>
            <FormRadio name={name} question={label} choices={choices} />
          </div>
        );
      })}
    </>
  );
};

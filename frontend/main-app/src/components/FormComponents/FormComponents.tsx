import classes from "./FormComponents.module.css";
import { FormTextfield } from "../FormTextfield";
import { FormRadio } from "../FormRadio";
import React from "react";
import { Paragraph } from "@digdir/design-system-react";

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
        const { type, name, label, required, radioChoices } = component;

        return type === "textfield" ? (
          <div key={name} className={classes.component}>
            <FormTextfield name={name} label={label} required={required} error={errors?.[name]} />
          </div>
        ) : type === "radio" ? (
          <div key={name} className={classes.component}>
            <FormRadio name={name} label={label} radioChoices={radioChoices} />
          </div>
        ) : (
          <Paragraph>Error reading type from form schema.</Paragraph>
        );
      })}
    </>
  );
};

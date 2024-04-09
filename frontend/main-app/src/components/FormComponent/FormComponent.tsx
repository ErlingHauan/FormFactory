import classes from "./FormComponent.module.css";
import { FormTextfield } from "../FormTextfield";
import { FormRadio } from "../FormRadio";
import React from "react";
import { Paragraph } from "@digdir/design-system-react";

interface FormComponentsProps {
  component: FormComponent;
  error?: string[];
}

export const FormComponent: React.FC<FormComponentsProps> = ({
  component,
  error,
}): React.JSX.Element => {
  const { type, name, label, required, radioChoices } = component;
  let componentToRender: React.JSX.Element;

  if (type === "textfield") {
    componentToRender = (
      <FormTextfield name={name} label={label} required={required} error={error} />
    );
  } else if (type === "radio") {
    componentToRender = <FormRadio name={name} label={label} radioChoices={radioChoices} />;
  } else {
    componentToRender = <Paragraph>Error reading type from form schema.</Paragraph>;
  }

  return (
    <div key={name} className={classes.component}>
      {componentToRender}
    </div>
  );
};

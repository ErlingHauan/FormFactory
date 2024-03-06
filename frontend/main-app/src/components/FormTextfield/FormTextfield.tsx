import React from "react";
import { Heading, Textfield } from "@digdir/design-system-react";

interface FormTextFieldProps {
  name: string;
  question: string;
  error?: string[];
  required: boolean;
}

export const FormTextfield: React.FC<FormTextFieldProps> = ({ question, error, name, required }) => {
  const requiredPlaceholder = required ? "Required" : undefined;
  return (
    <>
      <Heading level={6} size="xxsmall" spacing>
        {question}
      </Heading>
      <Textfield name={name} error={error} placeholder={requiredPlaceholder} />
    </>
  );
};

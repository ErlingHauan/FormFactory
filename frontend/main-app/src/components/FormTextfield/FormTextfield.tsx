import React from "react";
import { Heading, Textfield } from "@digdir/design-system-react";

interface TextFieldProps {
  name: string;
  question: string;
  minLength?: number;
  maxLength?: number;
  error?: any;
}

export const FormTextfield: React.FC<TextFieldProps> = ({ question, error, name, minLength }) => {
  const requiredPlaceholder = minLength > 0 && "Required";
  return (
    <>
      <Heading level={6} size="xxsmall" spacing>
        {question}
      </Heading>
      <Textfield name={name} error={error} placeholder={requiredPlaceholder} />
    </>
  );
};

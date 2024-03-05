import React from "react";
import { Heading, Textfield } from "@digdir/design-system-react";

interface TextFieldProps {
  name: string
  question: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const FormTextfield: React.FC<TextFieldProps> = ({ question, name }) => {
  return (
    <>
      <Heading level={6} size="xxsmall" spacing>{question}</Heading>
      <Textfield name={name}/>
    </>
  );
};
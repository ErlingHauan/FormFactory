import React from "react";
import { Heading, Textfield } from "@digdir/design-system-react";

interface TextFieldProps {
  className?: string;
  question: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const FFTextfield: React.FC<TextFieldProps> = ({ question }) => {
  return (
    <>
      <Heading level={6} size="xxsmall" spacing>{question}</Heading>
      <Textfield />
    </>
  );
};
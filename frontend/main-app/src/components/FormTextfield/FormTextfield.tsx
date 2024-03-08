import React from "react";
import { Textfield } from "@digdir/design-system-react";

interface FormTextFieldProps {
  name: string;
  label: string;
  error?: string[];
  required: boolean;
}

export const FormTextfield: React.FC<FormTextFieldProps> = ({ label, error, name, required }) => {
  const requiredPlaceholder = required ? "Required" : undefined;
  return (
    <Textfield name={name} label={label} error={error} placeholder={requiredPlaceholder} />
  );
};

import React from "react";
import { Radio } from "@digdir/design-system-react";

interface FormRadioProps {
  name: string;
  label: string;
  radioChoices: string[];
}

export const FormRadio: React.FC<FormRadioProps> = ({ label, name, radioChoices }) => {
  const radioChoicesDefault = ["Yes", "No"];
  if (!radioChoices) radioChoices = radioChoicesDefault;
  return (
    <>
      <Radio.Group name={name} legend={label}>
        {radioChoices.map((choice, index) => (
          <Radio key={index} value={choice} defaultChecked={index == 0}>
            {choice}
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
};

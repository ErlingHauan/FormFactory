import React from "react";
import { Radio } from "@digdir/design-system-react";

interface FFRadioProps {
  question: string;
  required?: boolean;
  choices: string[];
}

export const FormRadio: React.FC<FFRadioProps> = ({ question, choices }) => {
  return (
    <>
      <Radio.Group legend={question}>
        {choices.map((choice) => (
          <Radio value={choice}>{choice}</Radio>
        ))}
      </Radio.Group>
    </>
  );
};
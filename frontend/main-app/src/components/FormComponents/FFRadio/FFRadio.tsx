import React from "react";
import { Radio } from "@digdir/design-system-react";

interface FFRadioProps {
  className?: string;
  question: string;
  required?: boolean;
  choices: string[];
}

export const FFRadio: React.FC<FFRadioProps> = ({ question, choices }) => {
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
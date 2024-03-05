import React from "react";
import { Radio } from "@digdir/design-system-react";

interface FFRadioProps {
  id: string
  question: string;
  required?: boolean;
  choices: string[];
}

export const FormRadio: React.FC<FFRadioProps> = ({ question, id, choices }) => {
  return (
    <>
      <Radio.Group name={id} legend={question}>
        {choices.map((choice, index) => (
          <Radio key={index} value={choice} defaultChecked={index == 0}>{choice}</Radio>
        ))}
      </Radio.Group>
    </>
  );
};
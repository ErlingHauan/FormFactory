import { Heading } from "@digdir/design-system-react";
import React from "react";
import { CustomParagraph } from "../CustomParagraph/CustomParagraph";

const form = {
  id: 1994,
  name: "Animal survey",
  published: "2018-01-10",
  components: [
    {
      id: 1,
      question: "How many animals do you have?",
      type: "textfield",
      minLength: -1,
      maxLength: 100,
    },
    {
      id: 2,
      question: "Do you prefer dogs or cats?",
      type: "radio",
      choices: ["Dogs", "Cats"]
    },
    {
      id: 3,
      question: "Would you consider being an animal owner?",
      type: "textfield",
      minLength: 2,
      maxLength: 300,
    }
  ]
};

export const FormViewer = (): React.JSX.Element => {
  return (
    <main>
      <Heading spacing>Title</Heading>
      {form.components.map((component) => {
        return <CustomParagraph heading={component.question} content={component.type} />
      })}
    </main>
  );
};

import { Button, Heading } from "@digdir/design-system-react";
import React from "react";
import { FFTextfield, FFRadio } from "../FormComponents";
import classes from "./FormViewer.module.css";

const form = {
  id: 1994,
  title: "Pet survey",
  published: "2018-01-10",
  components: [
    {
      id: 1,
      question: "How many animals do you have?",
      type: "textfield",
      required: true,
      minLength: 1,
      maxLength: 100
    },
    {
      id: 2,
      question: "Do you prefer dogs or cats?",
      type: "radio",
      required: true,
      choices: ["Dogs", "Cats"]
    },
    {
      id: 3,
      question: "Would you consider being an animal owner?",
      type: "textfield",
      required: true,
      minLength: 2,
      maxLength: 300
    },
    {
      id: 4,
      question: "How often do you take your pets for a walk?",
      type: "radio",
      required: true,
      choices: ["Daily", "2-3 times a week", "Weekly", "Rarely", "Never"]
    },
    {
      id: 5,
      question: "What is the main factor in choosing a pet?",
      type: "textfield",
      required: true,
      minLength: 1,
      maxLength: 200
    },
    {
      id: 6,
      question: "Have you ever adopted a pet from a shelter?",
      type: "radio",
      required: true,
      choices: ["Yes", "No"]
    }
  ]
};

export const FormViewer = (): React.JSX.Element => {
  return (
    <main>
      <form>
        <Heading level={1} size="xlarge" spacing>{form.title}</Heading>
        {form.components.map((c) => (
          c.type === "textfield" ? (
            <div className={classes.component}>
              <FFTextfield
                question={c.question}
                required={c.required}
                minLength={c.minLength}
                maxLength={c.maxLength}
              />
            </div>
          ) : (
            <div className={classes.component}>
              <FFRadio
                question={c.question}
                required={c.required}
                choices={c.choices}
              />
            </div>
          )
        ))}
        <Button>Submit form</Button>
      </form>
    </main>
  );
};

import { Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { FormRadio } from "../FormRadio";
import { FormTextfield } from "../FormTextfield";
import { z } from "zod";

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


const validateForm = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  let schemaShape = {};
  form.components.map((c) => {
    if (c.required) {
      schemaShape[c.id] = z.string().min(3);
    }
  });

  // const formSchema = z.object({});
  
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const submittedForm = Object.fromEntries(formData);
  console.log(submittedForm);
  
  // const parsedForm = formSchema.parse(submittedForm);
};

export const FormViewer = (): React.JSX.Element => {
  return (
    <main className={classes.card}>
      <form onSubmit={validateForm}>
        <Heading level={1} size="xlarge">{form.title}</Heading>
        {form.components.map((c) => (
          c.type === "textfield" ? (
            <div key={c.id} className={classes.component}>
              <FormTextfield
                name={c.id.toString()}
                question={c.question}
                required={c.required}
                minLength={c.minLength}
                maxLength={c.maxLength}
              />
            </div>
          ) : (
            <div key={c.id} className={classes.component}>
              <FormRadio
                id={c.id.toString()}
                question={c.question}
                required={c.required}
                choices={c.choices}
              />
            </div>
          )
        ))}
        <div className={classes.buttonContainer}>
          <Button type="submit" size={"large"} fullWidth={false}>Submit form<TasklistSendFillIcon /></Button>
        </div>
      </form>
    </main>
  );
};

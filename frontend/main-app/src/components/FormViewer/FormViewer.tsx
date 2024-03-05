import { Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { FormRadio } from "../FormRadio";
import { FormTextfield } from "../FormTextfield";
import { z } from "zod";
import { form } from "./form";

export const FormViewer = (): React.JSX.Element => {
  const [formErrors, setFormErrors] = useState(null);

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const generateSchema = (form) => {
      let schemaShape = {};
      form.components.map((c) => {
        if (c.required) {
          schemaShape[c.id] = z.string().min(1);
        }
      });
      const validationSchema = z.object(schemaShape);
      return validationSchema;
    };
    
    const validationSchema = generateSchema(form);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanedFormData = Object.fromEntries(formData);

    const result = validationSchema.safeParse(cleanedFormData);
    if ("error" in result) {
      setFormErrors(result.error.formErrors.fieldErrors);
    } else {
      setFormErrors({});
      // Send form submission to backend
    }
  };

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
                error={formErrors?.[c.id]}
              />
            </div>
          ) : (
            <div key={c.id} className={classes.component}>
              <FormRadio
                name={c.id.toString()}
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

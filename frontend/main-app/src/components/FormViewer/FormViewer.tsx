import { Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { FormRadio } from "../FormRadio";
import { FormTextfield } from "../FormTextfield";
import { form } from "./form";
import { cleanFormData, generateValidationSchema } from "./FormViewerUtils";

export const FormViewer = (): React.JSX.Element => {
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      
      const validationSchema = generateValidationSchema(form);
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const cleanedFormData = cleanFormData(formData);
      const result = validationSchema.safeParse(cleanedFormData);

      if ("error" in result) {
        setFormErrors(result.error.formErrors.fieldErrors);
      } else {
        setFormErrors({});
        console.log("Form validation successful.");
        // Pass form submission to backend
      }
    }
  ;

  return (
    <main className={classes.card}>
      <form onSubmit={handleSubmit}>
        <Heading level={1} size="xlarge">
          {form.title}
        </Heading>
        {form.components.map((c) =>
          c.componentType === "textfield" ? (
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
              <FormRadio name={c.id.toString()} question={c.question} choices={c.choices} />
            </div>
          )
        )}
        <div className={classes.buttonContainer}>
          <Button type="submit" size={"large"} fullWidth={false}>
            Submit form
            <TasklistSendFillIcon />
          </Button>
        </div>
      </form>
    </main>
  );
};

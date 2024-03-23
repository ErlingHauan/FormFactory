import { Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { alertToRender, cleanFormData, generateValidationSchema } from "./validationUtils";
import { FormComponent } from "../FormComponent";
import { getFormIdError, getFormSchema, postSubmission } from "./httpUtils";
import { useTranslation } from "react-i18next";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { formId } = useParams();

  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");
  const [formSchema, setFormSchema] = useState<Form>(null);

  useEffect(() => {
    getFormSchema(formId, setFormSchema);
  }, [formId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanedFormData = cleanFormData(formData);
    const validationSchema = generateValidationSchema(formSchema);
    const result = validationSchema.safeParse(cleanedFormData);

    if ("error" in result) {
      setFormErrors(result.error.formErrors.fieldErrors);
      setFormAlert("validationError");
    } else {
      setFormErrors({});
      postSubmission(formSchema, cleanedFormData, setFormAlert);
    }
  };

  const RenderValidForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Heading level={1} size="xlarge">
            {formSchema.title}
          </Heading>
          {formSchema.components.map((component) => (
            <FormComponent
              key={component.name}
              component={component}
              error={formErrors[component.name]}
            />
          ))}
          <div className={classes.buttonContainer}>
            <Button type="submit" size={"large"} fullWidth={false}>
              Submit form
              <TasklistSendFillIcon />
            </Button>
          </div>
        </form>
        {alertToRender(formAlert, t)}
      </>
    );
  };

  const RenderInvalidForm = () => {
    return (
      <>
        <Heading spacing>Form not found</Heading>
        {getFormIdError(formId, t)}
      </>
    );
  };

  return (
    // prettier-ignore
    <main className={classes.card}>
      {formSchema ? <RenderValidForm /> : <RenderInvalidForm />}
    </main>
  );
};

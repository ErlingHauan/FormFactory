import { Alert, Button, Heading, Paragraph } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { cleanFormData, generateValidationSchema } from "./validationUtils";
import { useTranslation } from "react-i18next";
import { FormComponent } from "../FormComponent";
import { getFormSchema, postSubmission } from "./httpUtils";

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

  let alertToRender = (alertType): React.JSX.Element => {
    if (alertType == "success") {
      return <Alert severity="success">{t("form_viewer.success")}</Alert>;
    } else if (alertType == "validationError") {
      return <Alert severity="danger">{t("form_viewer.validationError")}</Alert>;
    } else if (alertType == "serverError") {
      return <Alert severity="danger">{t("form_viewer.serverError")}</Alert>;
    }
  };

  if (formSchema) {
    return (
      <main className={classes.card}>
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
        {alertToRender(formAlert)}
      </main>
    );
  }

  if (!formSchema) {
    return (
      <main className={classes.card}>
        <Heading spacing>Form not found</Heading>
        {formId && <Paragraph>Could not find form with ID {formId}.</Paragraph>}
        {!formId && <Paragraph>No form Id was provided in the URL.</Paragraph>}
      </main>
    );
  }
};

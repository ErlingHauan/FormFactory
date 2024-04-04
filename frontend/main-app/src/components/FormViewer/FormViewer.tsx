import { Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { cleanFormData, generateValidationSchema, alertToRender } from "./validationUtils";
import { FormComponent } from "../FormComponent";
import { getFormSchema, postSubmission } from "./httpUtils";
import { useTranslation } from "react-i18next";
import { NotFound } from "../NotFound";

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

  const RenderForm = () => {
    return (
      <main className={classes.card}>
        <form onSubmit={handleSubmit}>
          <Heading level={1} size="xlarge" spacing>
            {formSchema.title}
          </Heading>
          {formSchema.components.map((component) => (
            <span key={component.name} className={classes.component}>
              <FormComponent component={component} error={formErrors[component.name]} />
            </span>
          ))}
          <div className={classes.buttonContainer}>
            <Button type="submit" size={"large"} fullWidth={false}>
              {t("form_viewer.submit")}
              <TasklistSendFillIcon />
            </Button>
          </div>
        </form>
        {alertToRender(formAlert, t)}
      </main>
    );
  };

  return formSchema ? <RenderForm /> : <NotFound />;
};

import { Button, Heading, Link, Paragraph } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { alertToRender, cleanFormData, generateValidationSchema } from "./validationUtils";
import { FormComponent } from "../FormComponent";
import { getForm, postSubmission } from "./httpUtils";
import { Trans, useTranslation } from "react-i18next";
import NotFound from "../NotFound";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { formId } = useParams();

  const [form, setForm] = useState<Form>(null);
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedForm = await getForm(formId);
      setForm(fetchedForm);
    })();
  }, [formId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanedFormData = cleanFormData(formData);
    const validationSchema = generateValidationSchema(form);
    const result = validationSchema.safeParse(cleanedFormData);

    if ("error" in result) {
      setFormValidationErrors(result.error.formErrors.fieldErrors);
      setFormAlert("validationError");
    } else {
      setFormValidationErrors({});
      postSubmission(form, cleanedFormData, setFormAlert);
    }
  };

  const RenderForm = () => (
    <main className={classes.card}>
      <form onSubmit={handleSubmit}>
        <Heading level={1} size="xlarge">
          {form?.title}
        </Heading>
        {form?.components.map((component) => (
          <div key={component.name} className={classes.component}>
            <FormComponent component={component} error={formValidationErrors[component.name]} />
          </div>
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

  const formBuilderLink = `/form-builder/${formId}`;
  const RenderDraft = () => (
    <main className={classes.card}>
      <Heading level={1} size="xlarge" spacing>
        {form?.title}
      </Heading>
      <Paragraph>
        <Trans i18nKey="form_viewer.draft" />
      </Paragraph>
      <Paragraph>
        <Link href={formBuilderLink}>{t("form_viewer.form_builder.link")}</Link>
      </Paragraph>
    </main>
  );

  return (
    <>
      {form && form.status.toLowerCase() === "draft" ? <RenderDraft /> : <RenderForm />}
      {!form && <NotFound />}
    </>
  );
};

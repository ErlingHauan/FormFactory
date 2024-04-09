import { Button, Heading, Link, Paragraph } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { alertToRender, cleanFormData, generateValidationSchema } from "./validationUtils";
import { FormComponent } from "../FormComponent";
import { getFormSchema, postSubmission } from "./httpUtils";
import { Trans, useTranslation } from "react-i18next";
import { NotFound } from "../NotFound";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { formId } = useParams();

  // This path currently leads nowhere, but will be added in the future.
  const formBuilderLink = `/form-builder/${formId}`;

  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");
  const [formSchema, setFormSchema] = useState<Form>(null);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedFormSchema = await getFormSchema(formId);
      setFormSchema(fetchedFormSchema);

      if (fetchedFormSchema?.status === "Draft") {
        setIsDraft(true);
      } else {
        setIsDraft(false);
      }
    })();
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

  const RenderForm = () => (
    <main className={classes.card}>
      <form onSubmit={handleSubmit}>
        <Heading level={1} size="xlarge">
          {formSchema.title}
        </Heading>
        {formSchema.components.map((component) => (
          <div key={component.name} className={classes.component}>
            <FormComponent component={component} error={formErrors[component.name]} />
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

  const RenderDraft = () => (
    <main className={classes.card}>
      <Heading level={1} size="xlarge" spacing>
        {formSchema.title}
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
      {formSchema && isDraft ? <RenderDraft /> : <RenderForm />}
      {!formSchema && <NotFound />}
    </>
  );
};

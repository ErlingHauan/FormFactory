import { Alert, Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import formSchema from "./formSchema";
import { cleanFormData, generateValidationSchema } from "./FormViewerUtils";
import { useTranslation } from "react-i18next";
import { FormComponents } from "../FormComponents/FormComponents";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanedFormData = cleanFormData(formData);
    const validationSchema = generateValidationSchema(formSchema);
    const result = validationSchema.safeParse(cleanedFormData);

    if ("error" in result) {
      setFormErrors(result.error.formErrors.fieldErrors);
      setFormAlert("error");
    } else {
      // To do: Pass form submission to backend
      setFormErrors({});
      setFormAlert("success");
    }
  };

  return (
    <main className={classes.card}>
      <form onSubmit={handleSubmit}>
        <Heading level={1} size="xlarge">
          {formSchema.title}
        </Heading>
        <FormComponents components={formSchema.components} errors={formErrors} />
        <div className={classes.buttonContainer}>
          <Button type="submit" size={"large"} fullWidth={false}>
            Submit form
            <TasklistSendFillIcon />
          </Button>
        </div>
      </form>
      {formAlert == "success" && <Alert severity="success">{t("form_viewer.success")}</Alert>}
      {formAlert == "error" && <Alert severity="danger">{t("form_viewer.error")}</Alert>}
    </main>
  );
};

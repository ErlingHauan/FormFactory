import { Alert, Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
// import formSchema from "./formSchema";
import { cleanFormData, generateValidationSchema } from "./FormViewerUtils";
import { useTranslation } from "react-i18next";
import { FormComponents } from "../FormComponents/FormComponents";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");
  const [formSchema, setFormSchema] = useState<Form>(null);


  useEffect(() => {
    const getFormSchema = async (formId: string) => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/forms/${formId}`;
      const response = await axios.get(targetUrl);
      console.log(response.data);
      setFormSchema(response.data);
    };

    getFormSchema("65b454e9-3bbd-49fb-bfd4-3d7c56433bf5");
  }, []);

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
      {formSchema && (
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
      )}
      {formAlert == "success" && <Alert severity="success">{t("form_viewer.success")}</Alert>}
      {formAlert == "error" && <Alert severity="danger">{t("form_viewer.error")}</Alert>}
    </main>
  );
};

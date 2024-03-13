import { Alert, Button, Heading, Paragraph } from "@digdir/design-system-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { cleanFormData, generateValidationSchema } from "./FormViewerUtils";
import { useTranslation } from "react-i18next";
import { FormComponents } from "../FormComponents/FormComponents";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const  { formId } = useParams();
  
  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");
  const [formSchema, setFormSchema] = useState<Form>(null);

  const getFormSchema = async (formId: string) => {
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/api/forms/${formId}`;
    try {
      const response = await axios.get(targetUrl);
      setFormSchema(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFormSchema(formId);
  }, [formId]);

  const postSubmission = async (formId, formData) => {
    let responses = [];
    let order = 0;
    
    for (const key in formData) {
      const response = {
        label: key,
        response: formData[key],
        order: order,
      };
      
      responses.push(response);
      order++;
    }
    
    const formattedSubmission = {
      formId: formId, // formId is not received correctly in backend
      submitted: new Date(),
      responses: responses
    };
    
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/api/submissions/`;
    try {
      const response = await axios.post(targetUrl, formattedSubmission);
      setFormAlert("success");
      console.log(response.status);
    } catch (error) {
      setFormAlert("serverError");
      console.log(error);
    }
  };

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
      postSubmission(formId, cleanedFormData);
    }
  };

  if (formSchema) {
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
        {formAlert == "validationError" && <Alert severity="danger">{t("form_viewer.error")}</Alert>}
        {formAlert == "serverError" &&
          <Alert severity="danger">Your form was validated correctly, but the server did not receive the form.</Alert>}
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

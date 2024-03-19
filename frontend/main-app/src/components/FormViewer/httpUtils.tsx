import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { Paragraph } from "@digdir/design-system-react";
import React from "react";
import { TFunction } from "i18next";

export const getFormSchema = async (formId: string, setFormSchema) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/api/forms/${formId}`;

  try {
    const response = await axios.get(targetUrl);
    setFormSchema(response.data);
  } catch (error) {
    console.log(error);
  }
};

const formatSubmission = (formSchema, formData) => {
  const responses = [];
  let i = 0;

  // Create a response object for every question in the submitted form
  for (const key in formData) {
    const response = {
      name: formSchema.components[i].name,
      order: formSchema.components[i].order,
      label: formSchema.components[i].label,
      response: formData[key],
    };

    responses.push(response);
    i++;
  }

  return {
    formId: formSchema.id,
    submitted: new Date(),
    responses: responses,
  };
};

export const postSubmission = async (formSchema, formData, setFormAlert) => {
  const formattedSubmission = formatSubmission(formSchema, formData);
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/api/submissions/`;

  try {
    await axios.post(targetUrl, formattedSubmission);
    setFormAlert("success");
  } catch (error) {
    setFormAlert("serverError");
    console.log(error);
  }
};

export const getFormIdError = (formId: string, t: TFunction) => {
  if (formId) {
    return (
      <Paragraph>
        {t("form_viewer.formId.notFound")}
        {formId}.
      </Paragraph>
    );
  }
  return <Paragraph>{t("form_viewer.formId.notProvided")}</Paragraph>;
};

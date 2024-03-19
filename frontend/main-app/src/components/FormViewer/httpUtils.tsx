import React from "react";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { Paragraph } from "@digdir/design-system-react";
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
  const responses = formSchema.components.map((component) => ({
    name: component.name,
    order: component.order,
    label: component.label,
    response: formData[component.name] || "No response",
  }));

  return {
    formId: formSchema.id,
    submitted: new Date(),
    responses,
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

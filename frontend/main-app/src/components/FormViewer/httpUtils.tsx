import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

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
    const response = await axios.post(targetUrl, formattedSubmission);
    setFormAlert("success");
  } catch (error) {
    setFormAlert("serverError");
    console.log(error);
  }
};

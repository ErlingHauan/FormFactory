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

export const postSubmission = async (formSchema, formData, setFormAlert) => {
  const responses = [];
  let order = 0;

  for (const key in formData) {
    const response = {
      order: order,
      label: formSchema.components[order].label,
      response: formData[key],
    };

    responses.push(response);
    order++;
  }

  const formattedSubmission = {
    formId: formSchema.id,
    submitted: new Date(),
    responses: responses,
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

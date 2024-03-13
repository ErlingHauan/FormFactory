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

export const postSubmission = async (formId, formData, setFormAlert) => {
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
    formId: formId,
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
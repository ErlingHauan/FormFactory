import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";

export const getForm = async (formId: string) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms/${formId}`;

  try {
    const response = await axios.get(targetUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
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
    formCreator: formSchema.user,
    submitted: new Date(),
    responses,
  };
};

export const postSubmission = async (formSchema, formData, setFormAlert) => {
  const formattedSubmission = formatSubmission(formSchema, formData);
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/submissions/`;

  try {
    await axios.post(targetUrl, formattedSubmission);
    setFormAlert("success");
  } catch (error) {
    setFormAlert("submissionServerError");
    console.log(error);
  }
};

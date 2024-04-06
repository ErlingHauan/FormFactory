import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";

export const getFormSchema = async (formId: string, setFormSchema) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms/${formId}`;

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
  const targetUrl = `${apiUrl}/submissions/`;

  try {
    await axios.post(targetUrl, formattedSubmission);
    setFormAlert("success");
  } catch (error) {
    setFormAlert("submissionServerError");
    console.log(error);
  }
};

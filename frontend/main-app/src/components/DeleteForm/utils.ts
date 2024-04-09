import axios from "axios";
import { getApiUrl } from "../../utils/getApiUrl";

export const deleteForm = async (formId: string) => {
  const apiUrl = getApiUrl();
  const deleteFormEndpoint = `${apiUrl}/forms/${formId}`;
  const deleteSubmissionsEndpoint = `${apiUrl}/submissions/form/${formId}`;

  try {
    await axios.delete(deleteFormEndpoint);
    await axios.delete(deleteSubmissionsEndpoint);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

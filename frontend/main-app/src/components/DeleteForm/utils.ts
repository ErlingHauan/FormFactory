import axios from "axios";
import { getApiUrl } from "../../utils/getApiUrl";

export const deleteForm = async (formId: string) => {
  const apiUrl = getApiUrl();
  const deleteFormEndpoint = `${apiUrl}/forms/${formId}`;
  const deleteSubmissionsEndpoint = `${apiUrl}/forms/${formId}/submissions`;

  try {
    await axios.delete(deleteFormEndpoint);
    await axios.delete(deleteSubmissionsEndpoint);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

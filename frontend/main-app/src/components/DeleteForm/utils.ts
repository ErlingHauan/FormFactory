import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const deleteForm = async (formId: string) => {
  const apiUrl = getApiUrl();
  const deleteFormEndpoint = `${apiUrl}/api/forms/${formId}`;
  const deleteSubmissionsEndpoint = `${apiUrl}/api/submissions/form/${formId}`;

  try {
    await axios.delete(deleteFormEndpoint);
    await axios.delete(deleteSubmissionsEndpoint);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

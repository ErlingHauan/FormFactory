import axios from "axios";
import { getApiUrl } from "../../utils/getApiUrl";

export const deleteForm = async (form: Form) => {
  const apiUrl = getApiUrl();
  const deleteFormEndpoint = `${apiUrl}/forms/${form.id}`;

  const submissions: Submission[] = await fetchUserSubmissions();
  if (submissions.length !== 0) deleteSubmissions(form.id);

  try {
    await axios.delete(deleteFormEndpoint);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserSubmissions = async () => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/submissions/user`;

  try {
    const result = await axios.get(targetUrl);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubmissions = async (formId: string) => {
  const apiUrl = getApiUrl();
  const deleteSubmissionsEndpoint = `${apiUrl}/forms/${formId}/submissions`;

  try {
    await axios.delete(deleteSubmissionsEndpoint);
  } catch (error) {
    alert("Could not delete submissions. See console for more information.");
    console.log(error);
  }
};

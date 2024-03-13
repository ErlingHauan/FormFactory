import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const getForms = async (setForms) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/api/forms`;

  try {
    const result = await axios.get(targetUrl);
    setForms(result.data);
  } catch (error) {
    console.log(error);
  }
};

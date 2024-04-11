import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { User } from "../../types";
import { NavigateFunction } from "react-router-dom";

export const createNewForm = (user: User, navigate: NavigateFunction) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms`;

  const newForm: Form = {
    user: user?.email,
    organization: user?.organization,
    title: "New form",
    description: "Description of the new form",
    status: "Draft",
    published: null,
    expires: null,
    components: [],
  };

  (async () => {
    try {
      const result = await axios.post(targetUrl, newForm);
      navigate(`/form-builder/${result.data.id}`);
    } catch (error) {
      console.log(error);
    }
  })();
};

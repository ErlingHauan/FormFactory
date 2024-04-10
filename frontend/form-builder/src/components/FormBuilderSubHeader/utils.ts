import { getApiUrl } from "../../../../main-app/src/utils/getApiUrl";
import axios from "axios";

export const saveForm = async (form: Form) => {
  validateOrder(form);

  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms`;
  try {
    await axios.put(targetUrl, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("The form has been saved!");
  } catch (error) {
    console.log(error);
  }
};

const validateOrder = (form: Form) => {
  form.components.forEach((item, index) => {
    item.order = index;
  });
};

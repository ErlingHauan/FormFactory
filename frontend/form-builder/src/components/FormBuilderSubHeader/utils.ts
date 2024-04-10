import { getApiUrl } from "../../../../main-app/src/utils/getApiUrl";
import axios from "axios";

export const saveForm = async (form: Form, publish?: boolean) => {
  validateOrder(form);

  if (publish) {
    form.status = "published";
    form.published = new Date();
  }

  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms`;
  try {
    await axios.put(targetUrl, form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    publish ? alert("Form published!") : alert("Form saved!");
  } catch (error) {
    console.log(error);
  }
};

const validateOrder = (form: Form) => {
  form.components.forEach((item, index) => {
    item.order = index;
  });
};

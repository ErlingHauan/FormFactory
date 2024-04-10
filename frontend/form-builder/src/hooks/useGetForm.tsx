import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../../main-app/src/utils/getApiUrl";

// Get a form using the URL parameter.

export const useGetForm = () => {
  const [form, setForm] = useState<Form | null>(null);
  const { formId } = useParams();

  useEffect(() => {
    (async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/forms/${formId}`;

      try {
        const response = await axios.get(targetUrl);
        setForm(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [formId]);

  return { form, setForm };
};

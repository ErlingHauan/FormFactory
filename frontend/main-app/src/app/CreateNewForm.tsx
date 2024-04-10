import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getApiUrl } from "../utils/getApiUrl";
import { useUser } from "../hooks/useUser";

export const CreateNewForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/forms`;

  useEffect(() => {
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

    user &&
      (async () => {
        try {
          const result = await axios.post(targetUrl, newForm);
          navigate(`/form-builder/${result.data.id}`);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [user]); // eslint-disable-line

  return <></>;
};

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../main-app/src/components/Login/LoginUtils";
import React, { useEffect } from "react";

const user = {
  id: "some-id",
  email: "user1@example.com",
  password: "12345678",
  organization: "Example LLC",
};

export const CreateNewForm = () => {
  const navigate = useNavigate();
  const newForm: Form = {
    user: user.email,
    organization: user.organization,
    title: "New form",
    description: "Description of the new form",
    status: "Draft",
    published: null,
    expires: null,
    components: [],
  };

  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/api/forms`;

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(targetUrl, newForm);
        navigate(`/form-builder/${result.data.id}`);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <></>;
};
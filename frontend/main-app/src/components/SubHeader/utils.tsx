import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { User } from "../../types";
import { NavigateFunction } from "react-router-dom";
import { Link } from "@digdir/design-system-react";
import { t } from "i18next";
import { ClipboardCheckmarkFillIcon } from "@navikt/aksel-icons";
import classes from "./SubHeader.module.css";
import React from "react";

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

export const formViewerHeading = () => {
  return (
    <Link href="/">
      {t("form_factory")}
      <ClipboardCheckmarkFillIcon className={classes.subHeaderIcon} />
    </Link>
  );
};

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

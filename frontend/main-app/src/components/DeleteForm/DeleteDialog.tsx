import React, { FormEvent, useContext, useState } from "react";
import { FormContext } from "../Dashboard";
import { t } from "i18next";
import { Button, Modal, Paragraph, Textfield } from "@digdir/design-system-react";
import { Trans } from "react-i18next";
import { TrashFillIcon } from "@navikt/aksel-icons";
import classes from "./DeleteForm.module.css";
import { deleteForm } from "./utils";

export const DeleteDialog: React.FC = () => {
  const form = useContext(FormContext);
  const [formError, setFormError] = useState("");

  const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanFormData = Object.fromEntries(formData);

    if (cleanFormData.confirmDelete.toString().toLowerCase() === "delete") {
      deleteForm(form);
    } else {
      setFormError(t("dashboard.delete.error"));
    }
  };

  return (
    <Modal.Dialog className={classes.modalWindow}>
      <Modal.Header className={classes.modalHeader}>{form.title}</Modal.Header>
      <form className={classes.modalContent} onSubmit={handleDelete}>
        <Paragraph>{t("dashboard.delete.form.confirm.question")}</Paragraph>
        <Paragraph>
          <Trans i18nKey="dashboard.delete.form.confirm.instruction" />
        </Paragraph>
        <Textfield name="confirmDelete" error={formError} />
        <Button color="danger" type="submit">
          <TrashFillIcon />
          {t("dashboard.delete.form")}
        </Button>
      </form>
    </Modal.Dialog>
  );
};

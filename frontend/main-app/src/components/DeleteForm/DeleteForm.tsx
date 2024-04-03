import classes from "./DeleteForm.module.css";
import { Button, Modal, Paragraph, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, ReactNode, useContext, useState } from "react";
import { TrashFillIcon } from "@navikt/aksel-icons";
import { FormContext } from "../Dashboard";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { Trans } from "react-i18next";
import { t } from "i18next";

interface ModalContentProps {
  className: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ className }) => {
  const form = useContext(FormContext);
  const [formError, setFormError] = useState("");

  const deleteForm = async (formId: string) => {
    const apiUrl = getApiUrl();
    const deleteFormEndpoint = `${apiUrl}/api/forms/${formId}`;
    const deleteSubmissionsEndpoint = `${apiUrl}/api/submissions/form/${formId}`;

    try {
      await axios.delete(deleteFormEndpoint);
      await axios.delete(deleteSubmissionsEndpoint);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanFormData = Object.fromEntries(formData);

    if (cleanFormData.confirmDelete.toString().toLowerCase() === "delete") {
      deleteForm(form.id.toString());
    } else {
      setFormError(t("dashboard.delete.error"));
    }
  };

  return (
    <form className={className} onSubmit={handleDelete}>
      <Paragraph>{t("dashboard.delete.areYouSure")}</Paragraph>
      <Paragraph>
        <Trans i18nKey="dashboard.delete.confirm" />
      </Paragraph>
      <Textfield name="confirmDelete" error={formError} />
      <Button color="danger" type="submit">
        <TrashFillIcon />
        {t("dashboard.delete.form")}
      </Button>
    </form>
  );
};

interface DeleteFormProps {
  children: ReactNode;
  color: string;
  className?: string;
  size?: string;
  variant?: string;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
  children,
  color,
  className,
  size,
  variant,
}) => {
  const formTitle = useContext(FormContext).title;
  return (
    <Modal.Root>
      <Modal.Trigger className={className} variant={variant} size={size} color={color}>
        {children}
      </Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header className={classes.modalHeader}>{formTitle}</Modal.Header>
        <ModalContent className={classes.modalContent}></ModalContent>
      </Modal.Dialog>
    </Modal.Root>
  );
};

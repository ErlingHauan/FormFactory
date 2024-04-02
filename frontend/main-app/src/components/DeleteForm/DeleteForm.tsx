import classes from "./DeleteForm.module.css";
import { Button, Modal, Paragraph, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, ReactNode, useContext, useState } from "react";
import { TrashFillIcon } from "@navikt/aksel-icons";
import { FormContext } from "../Dashboard";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

const deleteForm = async (formId: string) => {
  const apiUrl = getApiUrl();
  const targetUrl = `${apiUrl}/api/forms/${formId}`;

  try {
    const response = await axios.delete(targetUrl);
    alert(response.status);
  } catch (error) {
    console.log(error);
  }
};

const ModalContent = ({ className }) => {
  const form = useContext(FormContext);
  const [formError, setFormError] = useState("");

  const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanFormData = Object.fromEntries(formData);

    if (cleanFormData.confirmDelete.toString().toLowerCase() === "delete") {
      alert(`Deleting form with id ${form.id}`);
      deleteForm(form.id.toString());
    } else {
      setFormError("Confirmation keyword is incorrect.");
    }
  };

  return (
    <form className={className} onSubmit={handleDelete}>
      <Paragraph>
        Are you sure you want to delete this form? Both the form and its submissions will be deleted
        permanently.
      </Paragraph>
      <Paragraph>
        To confirm, type <strong>delete</strong> in the box below.
      </Paragraph>
      <Textfield name="confirmDelete" error={formError} />
      <Button color="danger" type="submit">
        <TrashFillIcon />
        Delete form
      </Button>
    </form>
  );
};

interface DeleteFormProps {
  children: ReactNode;
  color: string;
  formTitle: string;
  className?: string;
  size?: string;
  variant?: string;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
  children,
  color,
  formTitle,
  className,
  size,
  variant,
}) => {
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

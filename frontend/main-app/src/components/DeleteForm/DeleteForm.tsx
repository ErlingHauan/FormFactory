import classes from "./DeleteForm.module.css";
import { Button, Modal, Paragraph, Textfield } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import { TrashFillIcon } from "@navikt/aksel-icons";

const handleDelete = () => {
  alert("Delete confirmed!");
};

const ModalContent = ({ className }) => {
  return (
    <form className={className} onSubmit={handleDelete}>
      <Paragraph>Are you sure you want to delete this form? This action is irreversible.</Paragraph>
      <Paragraph>
        To confirm, type <strong>delete</strong> in the box below.
      </Paragraph>
      <Textfield />
      <Button color="danger" variant="secondary" type="submit">
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

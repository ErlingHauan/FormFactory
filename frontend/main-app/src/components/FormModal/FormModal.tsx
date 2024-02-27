import classes from "./FormModal.module.css";
import { Divider, Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import { CustomParagraph } from "../Dashboard/Dashboard";
import responseData from "./responseData.json";

interface FormModalProps {
  formId: number;
  children: ReactNode;
}

// Note: Currently this component contains placeholder data. Later, it will load its data dynamically from the database.

export const FormModal: React.FC<FormModalProps> = ({ formId, children }) => {
  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header>
          <Heading level={1} size="large" spacing>
            Responses
          </Heading></Modal.Header>
        <Modal.Content>
          <Heading level={2} size="medium" spacing>Response 1</Heading>
          <CustomParagraph heading="What is your favorite animal?" content="Cat" />
          <CustomParagraph heading="What is your 2nd favorite animal?" content="Dog" />
          <Divider className={classes.spacing} />
          <Heading level={2} size="medium" spacing>Response 2</Heading>
          <CustomParagraph heading="What is your favorite animal?" content="Cat" />
          <CustomParagraph heading="What is your 2nd favorite animal?" content="Dog" />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};
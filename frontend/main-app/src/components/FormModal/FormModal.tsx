import classes from "./FormModal.module.css"
import { Button, Divider, Heading, Modal, Paragraph } from "@digdir/design-system-react";
import React, { ReactNode } from "react";

interface FormModalProps {
  children: ReactNode;
}
export const FormModal: React.FC<FormModalProps> = ({children}) => {
  return (
    <Modal.Root>
      <Modal.Trigger><Button>{children}</Button></Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header>
          <Heading spacing>
            Responses
          </Heading></Modal.Header>
        <Modal.Content>
          <Heading>Response 1</Heading>
          <Heading level={6} size="small">What is your favorite animal?</Heading>
          <Paragraph spacing={true}>Cat</Paragraph>
          <Heading level={6} size="small">What is your 2nd favorite animal?</Heading>
          <Paragraph spacing={true}>Dog</Paragraph>
          <Divider />
          <Heading>Response 2</Heading>
          <Heading level={6} size="small">What is your favorite animal?</Heading>
          <Paragraph spacing={true}>Dog</Paragraph>
          <Heading level={6} size="small">What is your 2nd favorite animal?</Heading>
          <Paragraph spacing={true}>Cat</Paragraph>
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  )
}
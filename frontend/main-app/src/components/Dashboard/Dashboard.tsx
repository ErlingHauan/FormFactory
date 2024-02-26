import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React from "react";
import { Accordion, Button, Heading, Modal, Paragraph } from "@digdir/design-system-react";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  FilePlusFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon
} from "@navikt/aksel-icons";

export const Dashboard = (): React.JSX.Element => {

  return (
    <main className={classes.dashboard}>
      <div className={classes.headingContainer}>
        <Heading level={1}>
          Dashboard
        </Heading>
        <Button color="success" asChild>
          <a href="/form-builder">
            <FilePlusFillIcon />New form
          </a>
        </Button>
      </div>

      <Accordion border={true}>
        <Accordion.Item>
          <Accordion.Header>
            <Heading level={2} size="medium">Form 1</Heading>
          </Accordion.Header>
          <Accordion.Content className={classes.accordionContentContainer}>
            <div className={classes.infoContainer}>
              <Heading level={6} size="small">Description</Heading>
              <Paragraph spacing={true}>A survey of the users of Form Factory.</Paragraph>
              <Heading level={6} size="small">Status</Heading>
              <Paragraph spacing={true}>Published - June 26th 2024</Paragraph>
              <Heading level={6} size="small">Expiration date</Heading>
              <Paragraph spacing={true}>Not set</Paragraph>
              <Heading level={6} size="small">Submissions</Heading>
              <Paragraph spacing={true}>19</Paragraph>
            </div>
            <div className={classes.buttonContainer}>
              <Button><ClipboardLinkFillIcon />Share form</Button>
              <Modal.Root>
                <Modal.Trigger><PersonEnvelopeFillIcon />View responses</Modal.Trigger>
                <Modal.Dialog className={classes.modalContainer}>
                  <Modal.Header>Response 1</Modal.Header>
                  <Modal.Content>
                    <Heading level={6} size="small">What is your favorite animal?</Heading>
                    <Paragraph spacing={true}>Cat</Paragraph>
                  </Modal.Content>
                </Modal.Dialog>
              </Modal.Root>
              <Button><CloudDownFillIcon />Download data</Button>
              <Button color="danger"><TrashFillIcon />Delete form</Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <Accordion border={true}>
        <Accordion.Item>
          <Accordion.Header>
            <Heading level={2} size="medium">Form 2</Heading>
          </Accordion.Header>
          <Accordion.Content>Form content</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </main>
  );
};

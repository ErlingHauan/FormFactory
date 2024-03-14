import classes from "./FormModal.module.css";
import { Divider, Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import submittedData from "./submittedData.json";
import { CustomParagraph } from "../CustomParagraph";

const ListAnswers = ({submissions}): React.JSX.Element => {
  // const submissions = submittedData.submissions;

  return (
    <>
      {submissions.map(({ id, responses }, index: number) => (
        <React.Fragment key={id}>
          <Heading level={3} size="large" spacing>
            Submission #{index + 1}
          </Heading>
          {responses.map(({ order, label, response }) => (
            <CustomParagraph key={order} heading={label} content={response} />
          ))}
          {index < submissions.length - 1 && (
            <Divider color="strong" className={classes.spacing} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

interface FormModalProps {
  children: ReactNode;
  submissions: Submission[];
  className?: string;
  size?: string;
  variant?: string;
}

export const FormModal: React.FC<FormModalProps> = ({ children, submissions, className, size, variant }) => {
  return (
    <Modal.Root>
      <Modal.Trigger className={className} variant={variant} size={size}>
        {children}
      </Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header>Submissions to {submittedData.title}</Modal.Header>
        <Modal.Content>
          <ListAnswers submissions={submissions}/>
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

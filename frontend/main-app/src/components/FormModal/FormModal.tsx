import classes from "./FormModal.module.css";
import { Divider, Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import submittedData from "./submittedData.json";
import { CustomParagraph } from "../CustomParagraph/CustomParagraph";

const ListAnswers = (): React.JSX.Element => {
  const submissions = submittedData.submissions;

  return (
    <>
      {submissions.map(({ submissionId, answers }, submissionIndex) => (
        <React.Fragment key={submissionId}>
          <Heading level={3} size="large" spacing>
            Submission #{submissionId}
          </Heading>
          {answers.map(({ answerId, question, answer }) => (
            <CustomParagraph key={answerId} heading={question} content={answer} />
          ))}
          {submissionIndex < submissions.length - 1 && (
            <Divider color="strong" className={classes.spacing} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

interface FormModalProps {
  children: ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({ children }) => {
  return (
    <Modal.Root>
      <Modal.Trigger className={classes.button} variant="secondary">
        {children}
      </Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header>Submissions to {submittedData.title}</Modal.Header>
        <Modal.Content>
          <ListAnswers />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

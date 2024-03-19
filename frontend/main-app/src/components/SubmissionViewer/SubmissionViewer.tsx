import classes from "./SubmissionViewer.module.css";
import { Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import submittedData from "./submittedData.json";
import { CustomParagraph } from "../CustomParagraph";

const ListAnswers = (): React.JSX.Element => {
  const submissions = submittedData.submissions;

  return (
    <>
      {submissions.map(({ submissionId, answers }) => (
        <div key={submissionId} className={classes.submission}>
          <Heading level={3} size="medium" className={classes.submissionHeading}>
            Submission #{submissionId}
          </Heading>
          {answers.map(({ answerId, question, answer }) => (
            <CustomParagraph key={answerId} heading={question} content={answer} />
          ))}
        </div>
      ))}
    </>
  );
};

interface FormModalProps {
  children: ReactNode;
  className?: string;
  size?: string;
  variant?: string;
}

export const SubmissionViewer: React.FC<FormModalProps> = ({
  children,
  className,
  size,
  variant,
}) => {
  return (
    <Modal.Root>
      <Modal.Trigger className={className} variant={variant} size={size}>
        {children}
      </Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header className={classes.modalHeader}>
          Submissions to {submittedData.title}
        </Modal.Header>
        <Modal.Content className={classes.modalContent}>
          <ListAnswers />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

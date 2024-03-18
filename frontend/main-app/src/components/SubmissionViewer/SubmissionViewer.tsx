import classes from "./SubmissionViewer.module.css";
import { Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import { CustomParagraph } from "../CustomParagraph";

interface ListAnswersProps {
  submissions: Submission[];
}

const ListAnswers: React.FC<ListAnswersProps> = ({ submissions }) => {
  return (
    <>
      {submissions.map(({ id, responses }, index: number) => (
        <div key={id} className={classes.submission}>
          <Heading level={3} size="medium" className={classes.submissionHeading}>
            Submission #{index + 1}
          </Heading>
          {responses.map(({ order, label, response }) => (
            <CustomParagraph key={order} heading={label} content={response} />
          ))}
        </div>
      ))}
    </>
  );
};

interface FormModalProps {
  children: ReactNode;
  submissions: Submission[];
  formTitle: string;
  className?: string;
  size?: string;
  variant?: string;
}

export const SubmissionViewer: React.FC<FormModalProps> = ({
  children,
  submissions,
  formTitle,
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
        <Modal.Header className={classes.modalHeader}>Submissions to {formTitle}</Modal.Header>
        <Modal.Content className={classes.modalContent}>
          <ListAnswers submissions={submissions} />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

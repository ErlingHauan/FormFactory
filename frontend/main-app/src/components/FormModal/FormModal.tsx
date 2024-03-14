import classes from "./FormModal.module.css";
import { Divider, Heading, Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import { CustomParagraph } from "../CustomParagraph";

interface ListAnswersProps {
  submissions: Submission[];
}

const ListAnswers: React.FC<ListAnswersProps> = ({ submissions }) => {
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
          {index < submissions.length - 1 && <Divider color="strong" className={classes.spacing} />}
        </React.Fragment>
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

export const FormModal: React.FC<FormModalProps> = ({
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
        <Modal.Header>Submissions to {formTitle}</Modal.Header>
        <Modal.Content>
          <ListAnswers submissions={submissions} />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

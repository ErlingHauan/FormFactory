import classes from "./SubmissionViewer.module.css";
import { Heading, Modal, Paragraph } from "@digdir/design-system-react";
import React, { ReactNode, useContext } from "react";
import { CustomParagraph } from "../CustomParagraph";
import { t } from "i18next";
import { DashboardContext } from "../../context/context";

interface ListAnswersProps {
  submissions: Submission[];
}

const ListAnswers: React.FC<ListAnswersProps> = ({ submissions }) => {
  if (submissions.length === 0) {
    return <Paragraph className={classes.submission}>{t("dashboard.submissions.empty")}</Paragraph>;
  }

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

interface SubmissionViewerProps {
  children: ReactNode;
  submissions: Submission[];
  className?: string;
  size?: string;
  variant?: string;
}

export const SubmissionViewer: React.FC<SubmissionViewerProps> = ({
  children,
  submissions,
  className,
  size,
  variant,
}) => {
  const formTitle = useContext(DashboardContext).title;
  return (
    <Modal.Root>
      <Modal.Trigger className={className} variant={variant} size={size}>
        {children}
      </Modal.Trigger>
      <Modal.Dialog className={classes.modalWindow}>
        <Modal.Header className={classes.modalHeader}>{formTitle}</Modal.Header>
        <Modal.Content className={classes.modalContent}>
          <ListAnswers submissions={submissions} />
        </Modal.Content>
      </Modal.Dialog>
    </Modal.Root>
  );
};

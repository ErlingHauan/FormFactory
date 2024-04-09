import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";
import { SubmissionViewer } from "../SubmissionViewer";
import { CloudDownFillIcon, PersonEnvelopeFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { Button } from "@digdir/design-system-react";
import { ShareForm } from "./ShareForm";
import { FormContext } from "../Dashboard";
import { DeleteForm } from "../DeleteForm/DeleteForm";

interface ButtonGroupProps {
  submissions: Submission[];
  formUrl: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ submissions, formUrl }) => {
  const { t } = useTranslation();
  const form = useContext(FormContext);

  const handleDownload = async () => {
    // Setup file
    const jsonString = JSON.stringify(submissions, null, 2);
    const file = new Blob([jsonString], { type: "application/json" });
    const fileName = form.title + ".json";

    // Setup temporary element
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);

    element.click();

    // Cleanup
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className={classes.buttonContainer}>
      <SubmissionViewer
        submissions={submissions}
        className={classes.button}
        size="small"
        variant="secondary"
      >
        <PersonEnvelopeFillIcon />
        {t("dashboard.view.submissions")}
      </SubmissionViewer>
      <Button className={classes.button} size="small" variant="secondary" onClick={handleDownload}>
        <CloudDownFillIcon />
        {t("dashboard.download")}
      </Button>
      <ShareForm formUrl={formUrl} />
      <DeleteForm className={classes.button} color="danger" size="small" variant="secondary">
        <TrashFillIcon />
        {t("dashboard.delete.form")}
      </DeleteForm>
    </div>
  );
};

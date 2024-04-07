import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";
import { SubmissionViewer } from "../SubmissionViewer";
import { CloudDownFillIcon, PersonEnvelopeFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { Button } from "@digdir/design-system-react";
import { ShareForm } from "./ShareForm";

interface ButtonGroupProps {
  submissions: Submission[];
  form: Form;
  formUrl: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ submissions, form, formUrl }) => {
  const { t } = useTranslation();

  const handleDownload = async () => {
    const jsonString = JSON.stringify(submissions, null, 2);
    const file = new Blob([jsonString], { type: "application/json" });

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);

    const fileName = form.title + ".json";
    element.download = fileName;

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className={classes.buttonContainer}>
      <SubmissionViewer
        submissions={submissions}
        formTitle={form.title}
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
      <Button className={classes.button} color="danger" size="small" variant="secondary">
        <TrashFillIcon />
        {t("dashboard.delete.form")}
      </Button>
    </div>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
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
    const apiUrl = getApiUrl();
    const targetUrl = `${apiUrl}/api/submissions/form/${form.id}`;
    const fileName = form.title + ".json";

    try {
      const result = await axios.get(targetUrl);
      const jsonString = JSON.stringify(result.data, null, 2);

      const file = new Blob([jsonString], { type: "application/json" });
      const element = document.createElement("a");

      element.href = URL.createObjectURL(file);
      element.download = fileName;

      document.body.appendChild(element);
      element.click();

      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    } catch (error) {
      console.error(error);
    }
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

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";
import { CloudDownFillIcon, PersonEnvelopeFillIcon, TrashFillIcon } from "@navikt/aksel-icons";
import { Accordion, Button, Heading } from "@digdir/design-system-react";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { CustomParagraph } from "../CustomParagraph";
import { SubmissionViewer } from "../SubmissionViewer";
import { ShareForm } from "./ShareForm";
interface ButtonGroupProps {
  submissions: Submission[];
  form: Form;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ submissions, form }) => {
  const { t } = useTranslation();
  const { title, id } = form;

  return (
    <div className={classes.buttonContainer}>
      <SubmissionViewer
        submissions={submissions}
        formTitle={title}
        className={classes.button}
        size="small"
        variant="secondary"
      >
        <PersonEnvelopeFillIcon />
        {t("dashboard.view.submissions")}
      </SubmissionViewer>
      <Button className={classes.button} size="small" variant="secondary">
        <CloudDownFillIcon />
        {t("dashboard.download")}
      </Button>
      <ShareForm id={id} />
      <Button className={classes.button} color="danger" size="small" variant="secondary">
        <TrashFillIcon />
        {t("dashboard.delete.form")}
      </Button>
    </div>
  );
};

interface DashboardAccordionProps {
  form: Form;
}

export const DashboardAccordion: React.FC<DashboardAccordionProps> = ({ form }) => {
  const [submissions, setSubmissions] = useState();
  const [submissionCount, setSubmissionCount] = useState();

  useEffect(() => {
    const getSubmissionCount = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/submissions/form/${form.id}`;

      try {
        const result = await axios.get(targetUrl);
        setSubmissions(result.data);
        setSubmissionCount(result.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getSubmissionCount();
  }, [form.id]);

  return (
    <Accordion border={true} key={form.id}>
      <Accordion.Item>
        <Accordion.Header>
          <Heading level={2} size="xxsmall">
            {form.title}
          </Heading>
        </Accordion.Header>
        <Accordion.Content className={classes.accordionContentContainer}>
          <div className={classes.infoContainer}>
            <CustomParagraph heading="Description" content={form.description} />
            <CustomParagraph heading="Status" content={form.status} />
            <CustomParagraph heading="Expiration date" content={form.expires || "Not set"} />
            <CustomParagraph heading="Submissions" content={submissionCount} />
          </div>
          <ButtonGroup submissions={submissions} form={form} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

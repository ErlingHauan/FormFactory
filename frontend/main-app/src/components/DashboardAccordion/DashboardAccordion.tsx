import React, { useContext, useEffect, useState } from "react";
import classes from "./DashboardAccordion.module.css";
import { FileSearchIcon } from "@navikt/aksel-icons";
import { Accordion, Button, Heading } from "@digdir/design-system-react";
import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { CustomParagraph } from "../CustomParagraph";
import { ButtonGroup } from "./ButtonGroup";
import { t } from "i18next";
import { FormStatus } from "./FormStatus";
import { FormContext } from "../../context/context";

export const DashboardAccordion: React.FC = () => {
  const form = useContext(FormContext);

  const [submissions, setSubmissions] = useState([]);
  const [submissionCount, setSubmissionCount] = useState();
  const formUrl = `${window.location.origin}/view/${form.id}`;

  useEffect(() => {
    const getSubmissionCount = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/forms/${form.id}/submissions`;

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
        <Accordion.Header className={classes.accordionHeader}>
          <Heading level={2} size="xxsmall">
            {form.title}
          </Heading>
          <Button asChild size="small" variant="tertiary">
            <a target="_blank" href={formUrl} onClick={(e) => e.stopPropagation()} rel="noreferrer">
              <FileSearchIcon />
              {t("dashboard.view.form")}
            </a>
          </Button>
        </Accordion.Header>
        <Accordion.Content className={classes.accordionContentContainer}>
          <div className={classes.infoContainer}>
            <CustomParagraph heading="Description" content={form.description} />
            <FormStatus form={form} />
            <CustomParagraph heading="Expiration date" content={form.expires || "Not set"} />
            <CustomParagraph heading="Submissions" content={submissionCount} />
          </div>
          <ButtonGroup submissions={submissions} formUrl={formUrl} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

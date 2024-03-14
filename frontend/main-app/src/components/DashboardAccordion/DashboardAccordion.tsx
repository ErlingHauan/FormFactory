import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./DashboardAccordion.module.css";
import { FormModal } from "../FormModal/FormModal";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon,
} from "@navikt/aksel-icons";
import { Accordion, Button, Heading } from "@digdir/design-system-react";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { CustomParagraph } from "../CustomParagraph";

const ButtonGroup = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={classes.buttonContainer}>
      <FormModal className={classes.button} size="small" variant="secondary">
        <PersonEnvelopeFillIcon />
        {t("dashboard.view.submissions")}
      </FormModal>
      <Button className={classes.button} size="small" variant="secondary">
        <CloudDownFillIcon />
        {t("dashboard.download")}
      </Button>
      <Button className={classes.button} size="small" variant="secondary">
        <ClipboardLinkFillIcon />
        {t("dashboard.share.form")}
      </Button>
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
  const [submissionCount, setSubmissionCount] = useState();

  useEffect(() => {
    const getSubmissionCount = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/submissions/form/${form.id}`;

      try {
        const result = await axios.get(targetUrl);
        setSubmissionCount(result.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getSubmissionCount();
  }, );

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
          <ButtonGroup />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

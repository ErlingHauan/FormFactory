import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Heading, Paragraph } from "@digdir/design-system-react";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  FilePlusFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon,
} from "@navikt/aksel-icons";
import { FormModal } from "../FormModal/FormModal";
import { CustomParagraph } from "../CustomParagraph/CustomParagraph";
import { useTranslation } from "react-i18next";
import formData from "./formData.json";

const forms = formData;

const Overview = (): React.JSX.Element => {
  const { t } = useTranslation();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState(0);

  useEffect(() => {
    let totalSubmissions = 0;
    for (const form of forms) {
      totalSubmissions += form.submissions;
    }
    setNumberOfSubmissions(totalSubmissions);
  }, []);

  return (
    <div className={classes.overview}>
      <div className={classes.headingContainer}>
        <Heading level={1}>{t("dashboard")}</Heading>
        <Button color="success" asChild>
          <a href="/form-builder">
            <FilePlusFillIcon />
            {t("dashboard.new.form")}
          </a>
        </Button>
      </div>
      <Paragraph>Number of forms: {forms.length}</Paragraph>
      {forms.length > 0 ? (
        <>
          <Paragraph spacing>Total submissions: {numberOfSubmissions}</Paragraph>
          <Paragraph>Your forms are shown below.</Paragraph>
        </>
      ) : (
        <Paragraph>Press the button on the right to create your first form!</Paragraph>
      )}
    </div>
  );
};

const ButtonGroup = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={classes.buttonContainer}>
      <FormModal>
        <PersonEnvelopeFillIcon />
        {t("dashboard.view.submissions")}
      </FormModal>
      <Button className={classes.button} variant="secondary">
        <CloudDownFillIcon />
        {t("dashboard.download")}
      </Button>
      <Button className={classes.button} variant="secondary">
        <ClipboardLinkFillIcon />
        {t("dashboard.share.form")}
      </Button>
      <Button className={classes.button} color="danger" variant="secondary">
        <TrashFillIcon />
        {t("dashboard.delete.form")}
      </Button>
    </div>
  );
};

const FormList = (): React.JSX.Element => {
  return (
    <div className={classes.formList}>
      {forms.map((form) => (
        <Accordion border={true} key={form.id}>
          <Accordion.Item>
            <Accordion.Header>
              <Heading level={2} size="medium">
                {form.title}
              </Heading>
            </Accordion.Header>
            <Accordion.Content className={classes.accordionContentContainer}>
              <div className={classes.infoContainer}>
                <CustomParagraph heading="Description" content={form.description} />
                <CustomParagraph heading="Status" content={form.status} />
                <CustomParagraph heading="Expiration date" content={form.expirationDate} />
                <CustomParagraph heading="Submissions" content={form.submissions} />
              </div>
              <ButtonGroup />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export const Dashboard = (): React.JSX.Element => {
  return (
    <main className={classes.dashboard}>
      <Overview />
      <FormList />
    </main>
  );
};

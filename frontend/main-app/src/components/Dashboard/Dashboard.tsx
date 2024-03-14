import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Heading } from "@digdir/design-system-react";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon
} from "@navikt/aksel-icons";
import { FormModal } from "../FormModal/FormModal";
import { CustomParagraph } from "../CustomParagraph";
import { useTranslation } from "react-i18next";
import { getForms } from "./httpUtils";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";



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

const FormList = ({ forms }): React.JSX.Element => {
  return (
    <div className={classes.formList}>
      {forms.map((form: Form) => (
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
                <CustomParagraph
                  heading="Expiration date"
                  content={form.expires || "Not set"}
                />
                <CustomParagraph heading="Submissions" content={"Not implemented yet"} />
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
  const [forms, setForms] = useState<Form[]>([]);
  
  useEffect(() => {
    getForms(setForms);
  }, [setForms]);

  return (
    <main className={classes.dashboard}>
      <DashboardOverview forms={forms} />
      <FormList forms={forms} />
    </main>
  );
};

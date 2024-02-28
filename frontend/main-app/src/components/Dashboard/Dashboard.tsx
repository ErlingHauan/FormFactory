import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React from "react";
import { Accordion, Button, Heading } from "@digdir/design-system-react";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  FilePlusFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon,
} from "@navikt/aksel-icons";
import { FormModal } from "../FormModal/FormModal";
import { useTranslation } from "react-i18next";
import formData from "./formData.json";
import { CustomParagraph } from "../CustomParagraph/CustomParagraph";

const forms = formData;

export const Dashboard = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <main className={classes.dashboard}>
      <div className={classes.headingContainer}>
        <Heading level={1}>{t("dashboard")}</Heading>
        <Button color="success" asChild>
          <a href="/form-builder">
            <FilePlusFillIcon />
            {t("dashboard.new.form")}
          </a>
        </Button>
      </div>

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
              <div className={classes.buttonContainer}>
                <Button>
                  <ClipboardLinkFillIcon />
                  {t("dashboard.share.form")}
                </Button>
                {/* FormModal will use form.id when the backend/database has been made */}
                <FormModal>
                  <PersonEnvelopeFillIcon />
                  {t("dashboard.view.submissions")}
                </FormModal>
                <Button>
                  <CloudDownFillIcon />
                  {t("dashboard.download")}
                </Button>
                <Button color="danger">
                  <TrashFillIcon />
                  {t("dashboard.delete.form")}
                </Button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </main>
  );
};

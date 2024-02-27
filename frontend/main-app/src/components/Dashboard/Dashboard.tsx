import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React from "react";
import { Accordion, Button, Heading, Paragraph } from "@digdir/design-system-react";
import {
  ClipboardLinkFillIcon,
  CloudDownFillIcon,
  FilePlusFillIcon,
  PersonEnvelopeFillIcon,
  TrashFillIcon
} from "@navikt/aksel-icons";
import { FormModal } from "../FormModal/FormModal";
import { useTranslation } from "react-i18next";

// Note: Currently this component contains placeholder data. Later, it will load its data dynamically from the database.

const forms = [
  {
    id: 1,
    title: "Form 1",
    description: "A survey of the users of Form Factory.",
    status: "Published - June 26th 2024",
    expirationDate: "Not set",
    submissions: 19
  },
  {
    id: 2,
    title: "Form 2",
    description: "A survey of the users of other form.",
    status: "Published - June 32th 2028",
    expirationDate: "Not set",
    submissions: 16
  }
];

interface CustomParagraphProps {
  heading: string;
  content: string | number;
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({ heading, content }) => (
  <>
    <Heading level={6} size="small">
      {heading}
    </Heading>
    <Paragraph spacing={true}>{content}</Paragraph>
  </>
);

const ButtonGroup = (): React.JSX.Element => {
  const {t} = useTranslation();
  return (
    <div className={classes.buttonContainer}>
      <Button><ClipboardLinkFillIcon />{t("dashboard.share.form")}</Button>
      <FormModal>
        <PersonEnvelopeFillIcon />{t("dashboard.view.responses")}
      </FormModal>
      <Button><CloudDownFillIcon />{t("dashboard.download")}</Button>
      <Button color="danger"><TrashFillIcon />{t("dashboard.delete.form")}</Button>
    </div>
  );
}

export const Dashboard = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <main className={classes.dashboard}>
      <div className={classes.headingContainer}>
        <Heading level={1}>
          {t("dashboard")}
        </Heading>
        <Button color="success" asChild>
          <a href="/form-builder">
            <FilePlusFillIcon />{t("dashboard.new_form")}
          </a>
        </Button>
      </div>

      {forms.map((form) => (
        <Accordion border={true} key={form.id}>
          <Accordion.Item>
            <Accordion.Header>
              <Heading level={2} size="medium">{form.title}</Heading>
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
    </main>
  );
};

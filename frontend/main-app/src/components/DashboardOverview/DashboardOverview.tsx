import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./DashboardOverview.module.css";
import { Heading, Paragraph } from "@digdir/design-system-react";
import { fetchUserSubmissions } from "../DeleteForm/utils";

interface DashboardOverviewProps {
  forms: Form[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ forms }) => {
  const { t } = useTranslation();
  const [submissionCount, setSubmissionCount] = useState();

  useEffect(() => {
    (async () => {
      const submissions = await fetchUserSubmissions();
      setSubmissionCount(submissions.length);
    })();
  }, []);

  if (forms.length !== 0)
    return (
      <div className={classes.overview}>
        <Heading level={3} size="xsmall">
          Summary
        </Heading>
        <Paragraph>
          {t("dashboard.number.of.forms")}
          {forms.length}
        </Paragraph>
        <Paragraph>
          {t("dashboard.total.submissions")}
          {submissionCount}
        </Paragraph>
      </div>
    );

  if (forms.length === 0)
    return (
      <div className={classes.overview}>
        <Paragraph>{t("dashboard.empty.message")}</Paragraph>
      </div>
    );
};

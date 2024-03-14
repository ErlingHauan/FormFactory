import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import classes from "./DashboardOverview.module.css";
import { Button, Heading, Paragraph } from "@digdir/design-system-react";
import { FilePlusFillIcon } from "@navikt/aksel-icons";

interface DashboardOverviewProps {
  forms: Form[]
}
export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ forms }) => {
  const { t } = useTranslation();
  const [submissionCount, setSubmissionCount] = useState();

  useEffect(() => {
    const getSubmissionCount = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/submissions/`;

      // Gets all submissions in the database
      try {
        const result = await axios.get(targetUrl);
        setSubmissionCount(result.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getSubmissionCount();
  }, []);

  return (
    <div className={classes.overview}>
      <div className={classes.headingContainer}>
        <Heading level={1} size="medium">
          {t("dashboard")}
        </Heading>
        <Button size="small" color="success" asChild>
          <a href="/form-builder">
            <FilePlusFillIcon />
            {t("dashboard.new.form")}
          </a>
        </Button>
      </div>
      {forms.length > 0 ? (
        <>
          <Paragraph>
            {t("dashboard.number.of.forms")}
            {forms.length}
          </Paragraph>
          <Paragraph>
            {t("dashboard.total.submissions")}
            {submissionCount}
          </Paragraph>
        </>
      ) : (
        <Paragraph>{t("dashboard.empty.message")}</Paragraph>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import classes from "./DashboardOverview.module.css";
import { Heading, Paragraph } from "@digdir/design-system-react";

interface DashboardOverviewProps {
  forms: Form[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ forms }) => {
  const { t } = useTranslation();
  const [submissionCount, setSubmissionCount] = useState();

  useEffect(() => {
    (async function getSubmissionCount() {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/submissions/`;

      try {
        const result = await axios.get(targetUrl);
        setSubmissionCount(result.data.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={classes.overview}>
      <div className={classes.headingContainer}>
        <Heading level={1} size="medium">
          {t("dashboard")}
        </Heading>
      </div>
      <div className={classes.overviewContent}>
        <div className={classes.paragraphContainer}>
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
      </div>
    </div>
  );
};

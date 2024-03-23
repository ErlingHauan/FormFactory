import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

export const Dashboard = (): React.JSX.Element => {
  useAuthorization();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    (async function getAllForms() {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/forms`;

      try {
        const result = await axios.get(targetUrl);
        setForms(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className={classes.dashboard}>
      <DashboardOverview forms={forms} />
      <div className={classes.formList}>
        {forms.map((form) => (
          <DashboardAccordion key={form.id} form={form} />
        ))}
      </div>
    </main>
  );
};

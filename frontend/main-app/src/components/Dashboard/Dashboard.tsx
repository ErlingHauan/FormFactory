import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const Dashboard = (): React.JSX.Element => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const getForms = async (setForms) => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/forms`;

      try {
        const result = await axios.get(targetUrl);
        setForms(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    getForms(setForms);
  }, []);

  return (
    <main className={classes.dashboard}>
      <DashboardOverview forms={forms} />
      <div className={classes.formList}>
        {forms.map((form: Form) => (
          <DashboardAccordion form={form} />
        ))}
      </div>
    </main>
  );
};

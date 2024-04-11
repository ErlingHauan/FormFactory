import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";
import { DashboardAccordionContext } from "../../context";

export const Dashboard = (): React.JSX.Element => {
  useAuthorization();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    (async function getAllForms() {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/forms/user`;

      try {
        const result = await axios.get(targetUrl, {
          withCredentials: true,
        });
        setForms(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.dashboard}>
        <DashboardOverview forms={forms} />
        <div className={classes.formList}>
          {forms.map((form) => (
            <DashboardAccordionContext.Provider value={form} key={form.id}>
              <DashboardAccordion />
            </DashboardAccordionContext.Provider>
          ))}
        </div>
      </div>
    </div>
  );
};

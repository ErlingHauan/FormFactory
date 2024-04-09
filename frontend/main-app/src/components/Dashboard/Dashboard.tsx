import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState, createContext } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../../utils/getApiUrl";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

export const FormContext: React.Context<null | Form> = createContext(null);
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
            <FormContext.Provider value={form} key={form.id}>
              <DashboardAccordion />
            </FormContext.Provider>
          ))}
        </div>
      </div>
    </div>
  );
};

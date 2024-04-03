import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState, createContext } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";

export const FormContext: React.Context<null | Form> = createContext(null);
export const Dashboard = (): React.JSX.Element => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    (async function getAllForms() {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/forms`;

      try {
        const result = await axios.get(targetUrl);
        setForms(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <main className={classes.dashboard}>
      <DashboardOverview forms={forms} />
      <div className={classes.formList}>
        {forms.map((form) => (
          <FormContext.Provider value={form} key={form.id}>
            <DashboardAccordion />
          </FormContext.Provider>
        ))}
      </div>
    </main>
  );
};

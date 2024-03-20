import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import { DashboardOverview } from "../DashboardOverview/DashboardOverview";
import { DashboardAccordion } from "../DashboardAccordion/DashboardAccordion";
import { getApiUrl } from "../Login/LoginUtils";
import axios from "axios";
export const Dashboard = (): React.JSX.Element => {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const verifyUserCookie = async () => {
      const apiUrl = getApiUrl();
      const targetUrl = `${apiUrl}/api/users/verify`;

      try {
        await axios.get(targetUrl);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };

    verifyUserCookie();
  }, []);

  return (
    <main className={classes.dashboard}>
      {isLoggedIn && <DashboardOverview forms={forms} />}
      <div className={classes.formList}>
        {forms.map((form) => (
          <DashboardAccordion key={form.id} form={form} />
        ))}
      </div>
    </main>
  );
};

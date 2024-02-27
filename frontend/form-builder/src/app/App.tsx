import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Toolbar } from "../components/Toolbar";
import { FormBoard } from "../components/FormBoard";
import { SettingsSidebar } from "../components/SettingsSidebar";
import { Heading } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

export const App = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Heading level={1} spacing className={classes.headline}>
        {t("form_builder")}
      </Heading>
      <div className={classes.builderGrid}>
        <div className={classes.builderSection}>
          <Toolbar />
        </div>
        <div className={classes.builderSection}>
          <FormBoard />
        </div>
        <div className={classes.builderSection}>
          <SettingsSidebar />
        </div>
      </div>
    </>
  );
};

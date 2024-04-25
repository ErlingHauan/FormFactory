import React from "react";
import { Paragraph } from "@digdir/design-system-react";
import classes from "./FormSettings.module.css";
import { useTranslation } from "react-i18next";

export const NoSelectedItem = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.noSelectedItem}>
      <Paragraph>{t("settings_side_bar.no.item.selected")}</Paragraph>
    </div>
  );
};

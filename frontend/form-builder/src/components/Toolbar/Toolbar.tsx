import { Heading } from "@digdir/design-system-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ToolBarItems } from "./ToolBarItems";
import classes from "./Toolbar.module.css";

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={classes.toolbar}>
      <Heading level={3} size="xxsmall" className={classes.toolbarHeader}>
        {t("toolbar_tools")}
      </Heading>
      <ToolBarItems />
    </div>
  );
};

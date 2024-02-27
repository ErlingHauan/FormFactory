import { Heading, Paragraph } from "@digdir/design-system-react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import React from "react";
import classes from "./Toolbar.module.css";
import { useTranslation } from "react-i18next";

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Heading level={2} size="medium" spacing>
        {t("toolbar_tools")}
      </Heading>
      <ul>
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSaveIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.save.form.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSendIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.validate.form.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <MenuHamburgerIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.text.field.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <BulletListIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.multiple.choice.component")}</Paragraph>
          </li>
        </div>
      </ul>
    </>
  );
};

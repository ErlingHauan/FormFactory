import React from "react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";

export const ToolBarItems = () => {
  const { t } = useTranslation();

  const Items = [
    {
      icon: <TasklistSaveIcon fontSize="3rem" />,
      text: t("toolbar_tools.save.form.component"),
    },
    {
      icon: <TasklistSendIcon fontSize="3rem" />,
      text: t("toolbar_tools.validate.form.component"),
    },
    {
      icon: <MenuHamburgerIcon fontSize="3rem" />,
      text: t("toolbar_tools.text.field.component"),
    },
    {
      icon: <BulletListIcon fontSize="3rem" />,
      text: t("toolbar_tools.multiple.choice.component"),
    },
  ];

  return (
    <div>
      {Items.map((item, index) => (
        <div key={index}>
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

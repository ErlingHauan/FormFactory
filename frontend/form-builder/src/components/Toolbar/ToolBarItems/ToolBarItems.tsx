import React from "react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import classes from "./ToolBarItems.module.css";
import { DraggableItem } from "../DraggableItem/DraggableItem";

export const ToolBarItems = () => {
  const { t } = useTranslation();

  const Items = [
    {
      icon: <TasklistSaveIcon fontSize="3rem" />,
      text: t("toolbar_tools.save.form.component"),
      draggable: false,
    },
    {
      icon: <TasklistSendIcon fontSize="3rem" />,
      text: t("toolbar_tools.validate.form.component"),
      draggable: false,
    },
    {
      icon: <MenuHamburgerIcon fontSize="3rem" />,
      text: t("toolbar_tools.text.field.component"),
      draggable: true,
    },
    {
      icon: <BulletListIcon fontSize="3rem" />,
      text: t("toolbar_tools.multiple.choice.component"),
      draggable: true,
    },
  ];

  return (
    <>
      {Items.map((item, index) =>
        item.draggable ? (
          <DraggableItem key={index} item={item} index={index} />
        ) : (
          <div key={index} className={classes.toolbarIcon}>
            {item.icon}
            <div>{item.text}</div>
          </div>
        ),
      )}
    </>
  );
};

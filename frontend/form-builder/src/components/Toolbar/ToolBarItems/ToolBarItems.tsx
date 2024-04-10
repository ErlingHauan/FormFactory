import React from "react";
import { useTranslation } from "react-i18next";
import { DraggableItem } from "../DraggableItem";
import { BulletListIcon, MenuHamburgerIcon } from "@navikt/aksel-icons";
import classes from "./ToolbarItems.module.css";

interface ToolBarItemsProps {
  compProps: FormComponent;
  icon: React.ReactNode;
}

export const ToolBarItems = () => {
  const { t } = useTranslation();

  const Items: ToolBarItemsProps[] = [
    {
      compProps: {
        type: "input",
        name: t("toolbar_tools.text.field.component"),
        label: t("toolbar_tools.text.field.component"),
        required: false,
      },
      icon: <MenuHamburgerIcon />,
    },
    {
      compProps: {
        type: "radio",
        name: t("toolbar_tools.multiple.choice.component"),
        label: t("toolbar_tools.multiple.choice.component"),
        radioChoices: ["Yes", "No"],
      },
      icon: <BulletListIcon />,
    },
  ];

  return (
    <div className={classes.toolbarItems}>
      {Items.map((item, index) => (
        <DraggableItem key={index} item={item.compProps} icon={item.icon} />
      ))}
    </div>
  );
};

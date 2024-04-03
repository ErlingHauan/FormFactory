import React from "react";
import { useTranslation } from "react-i18next";
import { DraggableItem } from "../DraggableItem";
import { BulletListIcon, MenuHamburgerIcon } from "@navikt/aksel-icons";

interface ToolBarItemsProps {
  compProps: FormComponent;
  icon: React.ReactNode;
}

export const ToolBarItems = () => {
  const { t } = useTranslation();

  const Items: ToolBarItemsProps[] = [
    {
      compProps: {
        type: t("toolbar_tools.text.field.component"),
        name: t("toolbar_tools.text.field.component"),
        label: "",
        required: false,
      },
      icon: <MenuHamburgerIcon fontSize="3rem" />,
    },
    {
      compProps: {
        type: t("toolbar_tools.multiple.choice.component"),
        name: t("toolbar_tools.multiple.choice.component"),
        label: "",
      },
      icon: <BulletListIcon fontSize="3rem" />,
    },
  ];

  return (
    <>
      {Items.map((item, index) => (
        <DraggableItem key={index} item={item.compProps} icon={item.icon} index={index} />
      ))}
    </>
  );
};

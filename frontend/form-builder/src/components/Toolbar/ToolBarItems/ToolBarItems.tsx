import React from "react";
import { BulletListIcon, MenuHamburgerIcon } from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import { DraggableItem } from "../DraggableItem";

export const ToolBarItems = () => {
  const { t } = useTranslation();

  const Items = [
    {
      icon: <MenuHamburgerIcon />,
      text: t("toolbar_tools.text.field.component"),
      draggable: true,
    },
    {
      icon: <BulletListIcon />,
      text: t("toolbar_tools.multiple.choice.component"),
      draggable: true,
    },
  ];

  return (
    <>
      {Items.map((item, index) => (
        <DraggableItem key={index} item={item} index={index} />
      ))}
    </>
  );
};

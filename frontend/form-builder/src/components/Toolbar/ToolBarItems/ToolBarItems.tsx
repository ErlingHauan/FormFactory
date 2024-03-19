import React from "react";
import { useDrag } from "react-dnd";
import { DraggableItemsType } from "../../../types/dndTypes";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import classes from "./ToolBarItems.module.css";

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

interface DraggableItemProps {
  item: {
    icon: React.ReactNode;
    text: string;
  };
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DraggableItemsType.ToolbarItem,
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={classes.toolbarIcon}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {item.icon}
      <div>{item.text}</div>
    </div>
  );
};

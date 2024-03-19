import React from "react";
import { useDrag } from "react-dnd";
import { DraggableItemsType } from "../../../types/dndTypes";
import classes from "./DraggableItem.module.css";

export interface ItemProps {
  icon: React.ReactNode;
  text: string;
  draggable: boolean;
}

interface DraggableItemProps {
  item: ItemProps;
  index: number;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
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

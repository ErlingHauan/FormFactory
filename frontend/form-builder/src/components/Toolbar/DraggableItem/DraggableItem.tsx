import React from "react";
import { useDrag } from "react-dnd";
import { DraggableItemsType } from "../../../types/dndTypes";
import classes from "./DraggableItem.module.css";

interface DraggableItemProps {
  item: FormComponent;
  icon: React.ReactNode;
  index: number;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item, icon, index }) => {
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
      className={classes.toolbarItem}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div className={classes.toolbarIcon}>{icon}</div>
      <div>{item.name}</div>
    </div>
  );
};

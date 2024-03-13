import { Heading } from "@digdir/design-system-react";

import React from "react";
import classes from "./Toolbar.module.css";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { ToolBarItems } from "./ToolBarItems/ToolBarItems";

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation();

  const [{ isDragging }, drag] = useDrag(() => ({
    item: { type: DraggableItemsType.ToolbarItem },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    type: DraggableItemsType.ToolbarItem,
  }));

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <Heading level={2} size="medium" spacing>
        {t("toolbar_tools")}
      </Heading>
      <ul>
        <div className={classes.toolbarIcon} ref={drag}>
          <li>
            <ToolBarItems />
          </li>
        </div>
      </ul>
    </div>
  );
};

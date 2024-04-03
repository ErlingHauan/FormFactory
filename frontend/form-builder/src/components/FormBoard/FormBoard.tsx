import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import { ComponentIcon, XMarkIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { ItemProps } from "../Toolbar/DraggableItem";

export const FormBoard = (): React.JSX.Element => {
  const form = [];
  const { t } = useTranslation();
  const [droppedItems, setDroppedItems] = React.useState<string[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item: ItemProps) => {
      setDroppedItems((prev) => [...prev, item.text]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleRemoveItem = (index: number) => {
    const newItems = droppedItems.filter((_, i) => i !== index);
    setDroppedItems(newItems);
  };

  return (
    <>
      <Heading level={2} size="medium" spacing>
        {t("form_builder")}
      </Heading>
      {form.length < 1 && (
        <div
          ref={drop}
          className={classes.noComponents}
          style={{ backgroundColor: isOver && "lightgreen" }}
        >
          {droppedItems.length === 0 ? (
            <>
              <ComponentIcon className={classes.noComponentsIcon} />
              <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
            </>
          ) : (
            droppedItems.map((item, index) => (
              <div key={index} className={classes.droppedItem}>
                <div>{item}</div>
                <XMarkIcon
                  title={t("form_builder.form.delete_item")}
                  className={classes.removalItem}
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

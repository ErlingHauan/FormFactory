import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import { ComponentIcon, XMarkIcon } from "@navikt/aksel-icons";
import classes from "./FormPreview.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { ItemProps } from "../Toolbar/DraggableItem";

interface FormPreviewProps {
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const FormPreview = ({ settingsRef }: FormPreviewProps): React.JSX.Element => {
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
      <Heading level={3} size="xxsmall" className={classes.previewHeading}>
        {t("form_builder.preview")}
      </Heading>
      <div
        ref={drop}
        className={classes.dropArea}
        style={{ backgroundColor: isOver && "lightgreen" }}
      >
        {droppedItems.length === 0 ? (
          <>
            <ComponentIcon className={classes.noComponentsIcon} />
            <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
          </>
        ) : (
          droppedItems.map((item, index) => (
            <div
              key={index}
              className={classes.droppedItem}
              onClick={() => settingsRef.current?.showModal()}
            >
              <div>{item}</div>
              <XMarkIcon
                title="Remove item"
                className={classes.removalItem}
                onClick={() => handleRemoveItem(index)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

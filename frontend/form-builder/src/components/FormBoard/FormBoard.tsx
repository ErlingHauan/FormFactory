import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";
import { ComponentIcon, XMarkIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { ItemProps } from "../Toolbar/DraggableItem";
import { FormComponent } from "../../../../main-app/src/components/FormComponent";

interface FormBoardProps {
  formComponents: FormComponent[];
  setFormComponents: React.Dispatch<React.SetStateAction<FormComponent[]>>;
}

export const FormBoard = ({
  formComponents,
  setFormComponents,
}: FormBoardProps): React.JSX.Element => {
  const form = [];
  const { t } = useTranslation();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item: ItemProps) => {
      setFormComponents((prev) => [...prev, item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleRemoveItem = (index: number) => {
    const newItems = formComponents.filter((_, i) => i !== index);
    setFormComponents(newItems);
  };

  return (
    <>
      <Heading level={3} size="xxsmall" spacing>
        {t("form_builder.canvas")}
      </Heading>
      {form.length < 1 && (
        <div
          ref={drop}
          className={classes.noComponents}
          style={{ backgroundColor: isOver && "lightgreen" }}
        >
          {formComponents.length === 0 ? (
            <>
              <ComponentIcon className={classes.noComponentsIcon} />
              <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
            </>
          ) : (
            formComponents.map((item, index) => (
              <div key={index} className={classes.droppedItem}>
                <FormComponent component={item} />
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

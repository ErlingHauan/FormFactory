import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";

export const FormBoard = (): React.JSX.Element => {
  const form = [];
  const { t } = useTranslation();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item, monitor) => {
      console.log(item, monitor);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <Heading level={2} size="medium" spacing>
        {t("form_builder")}
      </Heading>
      {form.length < 1 && (
        <div
          ref={drop}
          className={classes.noComponents}
          style={{ backgroundColor: isOver ? "red" : "blue" }}
        >
          <ComponentIcon className={classes.noComponentsIcon} />
          <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
        </div>
      )}
    </>
  );
};

import { Heading, Paragraph } from "@digdir/design-system-react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import React from "react";
import classes from "./Toolbar.module.css";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";

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
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSaveIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.save.form.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSendIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.validate.form.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li ref={drag} id="text-field">
            <MenuHamburgerIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.text.field.component")}</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li ref={drag} id="multiple-choice">
            <BulletListIcon fontSize="3rem" />
            <Paragraph size="xsmall">{t("toolbar_tools.multiple.choice.component")}</Paragraph>
          </li>
        </div>
      </ul>
    </div>
  );
};

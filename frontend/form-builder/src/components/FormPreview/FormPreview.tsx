import { Heading, Paragraph } from "@digdir/design-system-react";
import React, { useContext } from "react";
import { ComponentIcon, XMarkIcon } from "@navikt/aksel-icons";
import classes from "./FormPreview.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { FormComponent } from "../../../../main-app/src/components/FormComponent";
import { FormBuilderContext } from "../../app/App";

interface FormPreviewProps {
  settingsRef: React.RefObject<HTMLDialogElement>;
  formComponents: FormComponent[];
  setFormComponents: React.Dispatch<React.SetStateAction<FormComponent[]>>;
}

export const FormPreview = ({
  settingsRef,
  formComponents,
  setFormComponents,
}: FormPreviewProps): React.JSX.Element => {
  const { t } = useTranslation();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item: FormComponent) => {
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

  const { form } = useContext(FormBuilderContext);

  return (
    <>
      <Heading level={3} size="xxsmall" className={classes.previewHeading}>
        {t("form_builder.preview")}
      </Heading>
      <Heading level={3} size="xxsmall" className={classes.previewHeading}>
        {form?.title || "Title was not fetched"}
      </Heading>
      <div
        ref={drop}
        className={classes.dropArea}
        style={{ backgroundColor: isOver && "lightgreen" }}
      >
        {formComponents.length === 0 ? (
          <div className={classes.noComponents}>
            <ComponentIcon className={classes.noComponentsIcon} />
            <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
          </div>
        ) : (
          formComponents.map((item, index) => (
            <div
              key={index}
              className={classes.droppedItem}
              onClick={() => settingsRef.current?.showModal()}
            >
              <span className={classes.formBoardComponent}>
                <FormComponent component={item} />
              </span>
              <XMarkIcon
                title={t("form_builder.form.delete_item")}
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

import { Heading, Paragraph } from "@digdir/design-system-react";
import React, { useContext, useEffect, useRef } from "react";
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

export const FormPreview = ({ settingsRef }: FormPreviewProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { form, setForm } = useContext(FormBuilderContext);
  const formRef = useRef<Form>();

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item: FormComponent) => {
      setForm({ ...formRef.current, components: [...formRef.current.components, item] });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleRemoveItem = (index: number) => {
    let newForm = form;
    newForm.components = form.components.filter((_, i) => i !== index);
    setForm({ ...form, ...newForm });
  };

  return (
    <>
      <Heading level={3} size="xxsmall" className={classes.previewHeading}>
        {t("form_builder.preview")}
      </Heading>
      <div
        ref={drop}
        className={classes.dropArea}
        style={{ backgroundColor: isOver && "var(--fds-semantic-surface-warning-subtle)" }}
      >
        <div className={classes.formHeading}>
          <Heading level={4} size="medium">
            {form?.title}
          </Heading>
          <Paragraph>{form?.description}</Paragraph>
        </div>
        {form?.components?.length === 0 ? (
          <div className={classes.noComponents}>
            <ComponentIcon className={classes.noComponentsIcon} />
            <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
          </div>
        ) : (
          form?.components?.map((item, index) => (
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

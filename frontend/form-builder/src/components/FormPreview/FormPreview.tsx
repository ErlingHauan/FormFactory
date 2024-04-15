import { Heading, Paragraph } from "@digdir/design-system-react";
import React, { useContext, useEffect, useRef } from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import classes from "./FormPreview.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { FormComponent } from "../../../../main-app/src/components/FormComponent";
import { FormBuilderContext } from "../../context";

interface FormPreviewProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const FormPreview = ({ modalRef }: FormPreviewProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { form, setForm, setCurrentComponent } = useContext(FormBuilderContext);
  const formRef = useRef<Form>();

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableItemsType.ToolbarItem,
    drop: (item: FormComponent) => {
      const randomString = Math.random().toString(36).substring(2, 7);
      const updatedItem = { ...item, name: randomString };
      const updatedComponents = [...formRef.current.components, updatedItem];
      setForm({ ...formRef.current, components: updatedComponents });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // TODO: Fix buggy behaviour when clicking in mobile view
  const handleClick = (item: FormComponent, index: number) => {
    item.order = index;
    setCurrentComponent(item);
    modalRef.current?.showModal();
  };

  const RenderComponents = () => (
    <>
      {form?.components?.map((item, index) => (
        <div key={index} className={classes.droppedItem} onClick={() => handleClick(item, index)}>
          <span className={classes.formBoardComponent}>
            <FormComponent component={item} />
          </span>
        </div>
      ))}
    </>
  );
  const RenderFormHeading = () => (
    <div className={classes.formHeading}>
      <Heading level={4} size="medium">
        {form?.title}
      </Heading>
      <Paragraph>{form?.description}</Paragraph>
    </div>
  );

  const RenderNoComponentsMessage = () => (
    <div className={classes.noComponents}>
      <ComponentIcon className={classes.noComponentsIcon} />
      <Paragraph>{t("form_builder.drag.component.message")}</Paragraph>
    </div>
  );

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
        <RenderFormHeading />
        {form?.components?.length === 0 ? <RenderNoComponentsMessage /> : <RenderComponents />}
      </div>
    </>
  );
};

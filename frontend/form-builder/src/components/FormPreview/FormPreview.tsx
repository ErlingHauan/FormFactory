import { Heading } from "@digdir/design-system-react";
import React, { useContext, useEffect, useRef } from "react";
import classes from "./FormPreview.module.css";
import { useTranslation } from "react-i18next";
import { useDrop } from "react-dnd";
import { DraggableItemsType } from "../../types/dndTypes";
import { FormComponent } from "../../../../main-app/src/components/FormComponent";
import { FormBuilderContext, FormItem } from "../../context";
import { NoComponentsMessage } from "./NoComponentsMessage";
import { FormHeading } from "./FormHeading";

export const FormPreview = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { form, setForm, setSelectedItem, modalRef } = useContext(FormBuilderContext);
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

  const handleComponentClick = (item: FormItem, index: number) => {
    setSelectedItem({ ...item, order: index });
    setTimeout(() => {
      modalRef.current?.showModal();
    }, 0);
  };

  const RenderComponents = () => (
    <>
      {form?.components?.map((item, index) => (
        <div
          key={index}
          className={classes.droppedItem}
          onClick={() => handleComponentClick(item, index)}
        >
          <span className={classes.formBoardComponent}>
            <FormComponent component={item} />
          </span>
        </div>
      ))}
    </>
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
        <FormHeading form={form} />
        {form?.components?.length === 0 ? <NoComponentsMessage /> : <RenderComponents />}
      </div>
    </>
  );
};

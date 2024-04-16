import classes from "./FormPreview.module.css";
import { Heading, Paragraph } from "@digdir/design-system-react";
import React, { useContext } from "react";
import { FormBuilderContext } from "../../context";

interface FormHeadingProps {
  form: Form;
}

export const FormHeading = ({ form }: FormHeadingProps) => {
  const { setSelectedItem, modalRef } = useContext(FormBuilderContext);
  const handleHeadingClick = (title: string, description: string) => {
    setSelectedItem((prevState) => ({ ...prevState, title, description, type: "heading" }));
    setTimeout(() => {
      modalRef.current?.showModal();
    }, 0);
  };

  return (
    <div
      className={classes.formHeading}
      onClick={() => handleHeadingClick(form.title, form.description)}
    >
      <Heading level={4} size="medium">
        {form?.title}
      </Heading>
      <Paragraph>{form?.description}</Paragraph>
    </div>
  );
};

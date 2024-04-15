import classes from "./FormPreview.module.css";
import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";

interface FormHeadingProps {
  form: Form;
}

export const FormHeading = ({ form }: FormHeadingProps) => (
  <div className={classes.formHeading}>
    <Heading level={4} size="medium">
      {form?.title}
    </Heading>
    <Paragraph>{form?.description}</Paragraph>
  </div>
);

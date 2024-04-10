import { Link } from "@digdir/design-system-react";
import { DocPencilIcon } from "@navikt/aksel-icons";
import { CustomParagraph } from "../CustomParagraph";
import React from "react";

interface FormStatusProps {
  form: Form;
}

export const FormStatus = ({ form }: FormStatusProps) => {
  const statusUpperFirstLetter = form.status.charAt(0).toUpperCase() + form.status.slice(1);
  const link = (
    <Link href={`/form-builder/${form.id}`}>
      {statusUpperFirstLetter}
      <DocPencilIcon />
    </Link>
  );

  if (form.status === "Draft" || form.status === "draft") {
    return <CustomParagraph heading="Status" content={link} />;
  }

  return <CustomParagraph heading="Status" content={statusUpperFirstLetter} />;
};

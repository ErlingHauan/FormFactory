import { Heading, Paragraph } from "@digdir/design-system-react";
import React from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";

export const FormBoard = (): React.JSX.Element => {
  const form = [];

  return (
    <>
      <Heading level={2} size="medium" spacing>
        Form
      </Heading>
      {form.length < 1 && (
        <div className={classes.noComponents}>
          <ComponentIcon className={classes.noComponentsIcon} />
          <Paragraph>Drag components here</Paragraph>
        </div>
      )}
    </>
  );
};

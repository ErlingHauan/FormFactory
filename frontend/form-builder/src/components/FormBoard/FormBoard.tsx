import { Heading, Paragraph } from "@digdir/design-system-react";
import React, { useEffect, useState } from "react";
import { ComponentIcon } from "@navikt/aksel-icons";
import classes from "./FormBoard.module.css";

export const FormBoard = (): React.JSX.Element => {
  const [formComponents, setFormComponents] = useState([]);

  useEffect(() => {
    setFormComponents([]);
  }, []);

  return (
    <div className={classes.formBoard}>
      <Heading level={2} size="medium" spacing>
        Form
      </Heading>
      {formComponents.length < 1 && (
        <div className={classes.noComponents}>
          <ComponentIcon fontSize="3rem" />
          <Paragraph spacing>Drag components here</Paragraph>
        </div>
      )}
    </div>
  );
};

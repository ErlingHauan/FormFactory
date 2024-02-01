import { Heading, Paragraph } from "@digdir/design-system-react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon 
} from "@navikt/aksel-icons";
import React from "react";
import classes from "./Toolbar.module.css";

export const Toolbar = (): React.JSX.Element => {
  return (
    <div className={classes.toolbar}>
      <Heading level={2} size="medium" spacing>
        Tools
      </Heading>
      <ul>
        <li>
          <TasklistSaveIcon fontSize="3rem"/>
          <Paragraph size="xsmall">Save form</Paragraph>
        </li>
        <li>
          <TasklistSendIcon fontSize="3rem"/>
          <Paragraph size="xsmall">Validate form</Paragraph>
        </li>
        <li>
          <MenuHamburgerIcon fontSize="3rem"/>
          <Paragraph size="xsmall">Text field</Paragraph>
        </li>
        <li>
          <BulletListIcon fontSize="3rem"/>
          <Paragraph size="xsmall">Multiple choice</Paragraph>
        </li>
      </ul>
    </div>
  );
};

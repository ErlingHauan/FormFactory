import { Heading, Paragraph } from "@digdir/design-system-react";
import {
  BulletListIcon,
  TasklistSaveIcon,
  TasklistSendIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import React from "react";
import classes from "./Toolbar.module.css";

export const Toolbar = (): React.JSX.Element => {
  return (
    <>
      <Heading level={2} size="medium" spacing>
        Tools
      </Heading>
      <ul>
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSaveIcon fontSize="3rem" />
            <Paragraph size="xsmall">Save form</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <TasklistSendIcon fontSize="3rem" />
            <Paragraph size="xsmall">Validate form</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <MenuHamburgerIcon fontSize="3rem" />
            <Paragraph size="xsmall">Text field</Paragraph>
          </li>
        </div>
        <div className={classes.toolbarIcon}>
          <li>
            <BulletListIcon fontSize="3rem" />
            <Paragraph size="xsmall">Multiple choice</Paragraph>
          </li>
        </div>
      </ul>
    </>
  );
};

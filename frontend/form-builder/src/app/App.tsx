import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { SubHeader } from "../../../main-app/src/components/SubHeader";
import { Toolbar } from "../components/Toolbar";
import { FormBoard } from "../components/FormBoard";
import { SettingsSidebar } from "../components/SettingsSidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Heading, Link } from "@digdir/design-system-react";
import { FloppydiskFillIcon, TasklistSendFillIcon } from "@navikt/aksel-icons";

export const App = (): React.JSX.Element => {
  return (
    <>
      <SubHeader>
        <Heading className={classes.subHeaderHeading} level={2} size="xxsmall">
          Form Builder
        </Heading>
        <div className={classes.subHeaderLinks}>
          <Link>
            Save
            <FloppydiskFillIcon className={classes.subHeaderIcon} />
          </Link>
          <Link>
            Publish
            <TasklistSendFillIcon className={classes.subHeaderIcon} />
          </Link>
        </div>
      </SubHeader>
      <main className={classes.main}>
        <div className={classes.builderGrid}>
          <DndProvider backend={HTML5Backend}>
            <div className={classes.builderSection}>
              <Toolbar />
            </div>
            <div className={classes.builderSection}>
              <FormBoard />
            </div>
          </DndProvider>
          <div className={classes.builderSection}>
            <SettingsSidebar />
          </div>
        </div>
      </main>
    </>
  );
};

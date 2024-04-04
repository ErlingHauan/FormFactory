import React from "react";
import { Modal } from "@digdir/design-system-react";
import classes from "./CompSettings.module.css";

interface SettingsSidebarProps {
  settingsRef: React.RefObject<HTMLDialogElement>;
  SettingsContent: () => React.JSX.Element;
}

export const CompSettingsModal = ({
  settingsRef,
  SettingsContent,
}: SettingsSidebarProps): React.JSX.Element => {
  console.log(settingsRef);
  return (
    <Modal ref={settingsRef} className={classes.modalWindow}>
      <Modal.Header className={classes.modalHeader}>Settings</Modal.Header>
      <Modal.Content className={classes.modalContent}>
        <SettingsContent />
      </Modal.Content>
    </Modal>
  );
};

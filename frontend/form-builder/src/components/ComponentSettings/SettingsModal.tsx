import React from "react";
import { Modal } from "@digdir/design-system-react";
import classes from "./ComponentSettings.module.css";

interface SettingsSidebarProps {
  settingsRef: React.RefObject<HTMLDialogElement>;
  SettingsContent: () => React.JSX.Element;
}

export const SettingsModal = ({
  settingsRef,
  SettingsContent,
}: SettingsSidebarProps): React.JSX.Element => {
  return (
    <Modal ref={settingsRef} className={classes.modalWindow}>
      <Modal.Header className={classes.modalHeader}>Settings</Modal.Header>
      <Modal.Content className={classes.modalContent}>
        <SettingsContent />
      </Modal.Content>
    </Modal>
  );
};

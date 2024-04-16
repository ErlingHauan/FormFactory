import React from "react";
import { Modal } from "@digdir/design-system-react";
import classes from "./ComponentSettings.module.css";

interface SettingsSidebarProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  SettingsContent: () => React.JSX.Element;
}

export const SettingsModal = ({
  modalRef,
  SettingsContent,
}: SettingsSidebarProps): React.JSX.Element => {
  return (
    <Modal ref={modalRef} className={classes.modalWindow}>
      <Modal.Header className={classes.modalHeader}>Settings</Modal.Header>
      <Modal.Content className={classes.modalContent}>
        <p>Test</p>
        <SettingsContent />
      </Modal.Content>
    </Modal>
  );
};

import React, { useContext } from "react";
import { Modal } from "@digdir/design-system-react";
import classes from "./FormSettings.module.css";
import { FormBuilderContext } from "../../context";

interface SettingsSidebarProps {
  SettingsContent: () => React.JSX.Element;
}

export const SettingsModal = ({ SettingsContent }: SettingsSidebarProps): React.JSX.Element => {
  const { modalRef } = useContext(FormBuilderContext);
  return (
    <Modal ref={modalRef} className={classes.modalWindow}>
      <Modal.Header className={classes.modalHeader}>Settings</Modal.Header>
      <Modal.Content className={classes.modalContent}>
        <SettingsContent />
      </Modal.Content>
    </Modal>
  );
};

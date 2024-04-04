import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Textfield } from "@digdir/design-system-react";

interface SettingsSidebarProps {
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const SettingsModal = ({ settingsRef }: SettingsSidebarProps) => {
  const { t } = useTranslation();

  return (
    <Modal ref={settingsRef}>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content>
        <Textfield label={t("settings_side_bar.component.label")} size="small" />
        <Textfield label={t("settings_side_bar.minimum.length")} size="small" />
        <Textfield label={t("settings_side_bar.maximum.length")} size="small" />
      </Modal.Content>
    </Modal>
  );
};

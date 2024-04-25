import React from "react";
import { SettingsModal } from "./SettingsModal";
import { SettingsSidebar } from "./SettingsSidebar";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
}

export const FormSettings = ({ isSmallScreen }: ComponentSettingsProps): React.JSX.Element => {
  return isSmallScreen ? <SettingsModal /> : <SettingsSidebar />;
};

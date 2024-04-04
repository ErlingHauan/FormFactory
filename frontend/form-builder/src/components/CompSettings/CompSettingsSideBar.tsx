import React from "react";
import { Heading } from "@digdir/design-system-react";
import { useTranslation } from "react-i18next";

interface SettingsSidebarProps {
  SettingsContent: () => React.JSX.Element;
}

export const CompSettingsSidebar = ({
  SettingsContent,
}: SettingsSidebarProps): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Heading level={3} size="xxsmall" spacing>
        {t("settings_side_bar")}
      </Heading>
      <SettingsContent />
    </>
  );
};

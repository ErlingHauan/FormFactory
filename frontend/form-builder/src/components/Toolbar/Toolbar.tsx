import { Heading } from "@digdir/design-system-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ToolBarItems } from "./ToolBarItems/ToolBarItems";

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading level={2} size="medium" spacing>
        {t("toolbar_tools")}
      </Heading>
      <ToolBarItems />
    </div>
  );
};

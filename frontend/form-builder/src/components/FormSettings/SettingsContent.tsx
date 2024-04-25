import { HeadingSettings } from "./HeadingSettings";
import { ComponentSettings } from "./ComponentSettings";
import { NoSelectedItem } from "./NoSelectedItem";
import React, { useContext } from "react";
import { FormBuilderContext } from "../../context";

export const SettingsContent = () => {
  const { selectedItem } = useContext(FormBuilderContext);

  const componentMap = {
    heading: <HeadingSettings />,
    input: <ComponentSettings />,
    radio: <ComponentSettings />,
  };

  const SelectedComponent = componentMap[selectedItem?.type] || <NoSelectedItem />;

  return <>{SelectedComponent}</>;
};

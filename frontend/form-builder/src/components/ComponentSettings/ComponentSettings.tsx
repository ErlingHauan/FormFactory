import { Button, Checkbox, Radio, Textarea, Textfield } from "@digdir/design-system-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsModal } from "./SettingsModal";
import { CompSettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { TrashFillIcon } from "@navikt/aksel-icons";

interface ComponentSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const ComponentSettings = ({
  isSmallScreen,
  settingsRef,
}: ComponentSettingsProps): React.JSX.Element => {
  const SettingsContent = () => {
    const { currentComponent } = useContext(FormBuilderContext);
    return (
      <div className={classes.compSettingsContent}>
        {currentComponent?.type === "textfield" && <InputFieldSettings />}
        {currentComponent?.type === "radio" && <RadioSettings />}
      </div>
    );
  };

  return isSmallScreen ? (
    <SettingsModal SettingsContent={SettingsContent} settingsRef={settingsRef} />
  ) : (
    <CompSettingsSidebar SettingsContent={SettingsContent} />
  );
};

const InputFieldSettings = () => {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState<"Text" | "Number">("Text");
  const { currentComponent } = useContext(FormBuilderContext);

  const handleInputFormat = (value: string) => {
    setInputType(value as "Text" | "Number");
  };

  return (
    <>
      <Textfield label="Name" value={currentComponent.name} size="small" placeholder={"Required"} />
      <Textfield
        label={t("settings_side_bar.component.label")}
        value={currentComponent.label}
        size="small"
        placeholder={"Required"}
      />
      <Checkbox size="small" value="required" checked={currentComponent.required}>
        Require user response
      </Checkbox>
      <Radio.Group
        defaultValue={currentComponent.inputType || inputType}
        size="small"
        legend="Input format"
        onChange={handleInputFormat}
      >
        <Radio value="Text">Text</Radio>
        <Radio value="Number">Number</Radio>
      </Radio.Group>
      {inputType === "Text" && <TextSettings />}
      {inputType === "Number" && <NumberSettings />}
      <Button color={"danger"} variant={"secondary"} size={"small"}>
        <TrashFillIcon />
        Delete component
      </Button>
    </>
  );
};

const TextSettings = () => {
  const { t } = useTranslation();
  const { currentComponent } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        label={t("settings_side_bar.minimum.length")}
        value={currentComponent.minLength}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        label={t("settings_side_bar.maximum.length")}
        value={currentComponent.maxLength}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

const NumberSettings = () => {
  const { t } = useTranslation();
  const { currentComponent } = useContext(FormBuilderContext);
  return (
    <>
      <Textfield
        label={t("settings_side_bar.minimum.value")}
        value={currentComponent.greaterThan}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        label={t("settings_side_bar.maximum.value")}
        value={currentComponent.lessThan}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

const RadioSettings = () => {
  const { currentComponent } = useContext(FormBuilderContext);
  const { t } = useTranslation();

  return (
    <>
      <Textfield label="Name" value={currentComponent.name} size="small" />
      <Textfield
        label={t("settings_side_bar.component.label")}
        value={currentComponent.label}
        size="small"
      />
      <Textarea
        label={"Choices (comma separated)"}
        value={currentComponent.radioChoices?.join(", ")}
        size="small"
      />
      <Button color={"danger"} variant={"secondary"} size={"small"}>
        <TrashFillIcon />
        Delete component
      </Button>
    </>
  );
};

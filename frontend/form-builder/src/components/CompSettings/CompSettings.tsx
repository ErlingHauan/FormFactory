import { Button, Checkbox, Radio, Textarea, Textfield } from "@digdir/design-system-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CompSettingsModal } from "./CompSettingsModal";
import { CompSettingsSidebar } from "./CompSettingsSideBar";
import classes from "./CompSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { TrashFillIcon } from "@navikt/aksel-icons";

interface CompSettingsProps {
  isSmallScreen: boolean;
  settingsRef: React.RefObject<HTMLDialogElement>;
}

export const CompSettings = ({
  isSmallScreen,
  settingsRef,
}: CompSettingsProps): React.JSX.Element => {
  const SettingsContent = () => {
    const { currentComponent } = useContext(FormBuilderContext);
    return (
      <div className={classes.compSettingsContent}>
        <InputFieldSettings />
        {currentComponent?.type === "inputField" && <InputFieldSettings />}
        {currentComponent?.type === "radio" && <RadioSettings />}
      </div>
    );
  };

  return isSmallScreen ? (
    <CompSettingsModal SettingsContent={SettingsContent} settingsRef={settingsRef} />
  ) : (
    <CompSettingsSidebar SettingsContent={SettingsContent} />
  );
};

const InputFieldSettings = () => {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState<"Text" | "Number">("Text");

  const handleInputFormat = (value: string) => {
    setInputType(value as "Text" | "Number");
  };

  return (
    <>
      <Textfield label="Name" size="small" placeholder={"Required"} />
      <Textfield
        label={t("settings_side_bar.component.label")}
        size="small"
        placeholder={"Required"}
      />
      <Checkbox size="small" value="required">
        Require user response
      </Checkbox>
      <Radio.Group
        defaultValue="Text"
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
  return (
    <>
      <Textfield
        label={t("settings_side_bar.minimum.length")}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        label={t("settings_side_bar.maximum.length")}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

const NumberSettings = () => {
  const { t } = useTranslation();
  return (
    <>
      <Textfield label={t("settings_side_bar.minimum.value")} size="small" placeholder="Optional" />
      <Textfield label={t("settings_side_bar.maximum.value")} size="small" placeholder="Optional" />
    </>
  );
};

const RadioSettings = () => {
  const { t } = useTranslation();

  return (
    <>
      <Textfield label="Name" size="small" />
      <Textfield label={t("settings_side_bar.component.label")} size="small" />
      <Textarea label={"Choices (comma separated)"} size="small" />
      <Button color={"danger"} variant={"secondary"} size={"small"}>
        <TrashFillIcon />
        Delete component
      </Button>
    </>
  );
};

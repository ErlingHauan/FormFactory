import { Button, Checkbox, Radio, Textarea, Textfield } from "@digdir/design-system-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsModal } from "./SettingsModal";
import { CompSettingsSidebar } from "./SettingsSidebar";
import classes from "./ComponentSettings.module.css";
import { FormBuilderContext } from "../../app/App";
import { FloppydiskFillIcon, TrashFillIcon } from "@navikt/aksel-icons";

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
        <p>Order: {currentComponent?.order}</p>
        {currentComponent?.type === "input" && <InputFieldSettings />}
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
  const { currentComponent, form, setForm } = useContext(FormBuilderContext);
  const [inputType, setInputType] = useState<"string" | "number">("string");

  const handleInputFormat = (value: string) => {
    setInputType(value as "string" | "number");
  };

  const handleSave = () => {
    const index = currentComponent.order;
    let updatedComponents = form.components;
    updatedComponents[index] = currentComponent;

    setForm({ ...form, components: updatedComponents });
  };

  return (
    <>
      <Textfield
        label="Name"
        value={currentComponent.name || ""}
        size="small"
        placeholder={"Required"}
      />
      <Textfield
        label={t("settings_side_bar.component.label")}
        value={currentComponent.label || ""}
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
        <Radio value="string">Text</Radio>
        <Radio value="number">Number</Radio>
      </Radio.Group>
      {inputType === "string" && <TextSettings />}
      {inputType === "number" && <NumberSettings />}
      <div className={classes.buttons}>
        <Button color={"danger"} variant={"secondary"} size={"small"}>
          <TrashFillIcon />
          Delete component
        </Button>
        <Button color={"success"} size={"small"} onClick={handleSave}>
          <FloppydiskFillIcon />
          Save component
        </Button>
      </div>
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
        value={currentComponent.minLength || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        label={t("settings_side_bar.maximum.length")}
        value={currentComponent.maxLength || ""}
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
        value={currentComponent.greaterThan || ""}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        label={t("settings_side_bar.maximum.value")}
        value={currentComponent.lessThan || ""}
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
        value={currentComponent.label || ""}
        size="small"
      />
      <Textarea
        label={"Choices (comma separated)"}
        value={currentComponent.radioChoices?.join(", ") || ""}
        size="small"
      />
      <Button color={"danger"} variant={"secondary"} size={"small"}>
        <TrashFillIcon />
        Delete component
      </Button>
    </>
  );
};

import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { FormBuilderContext } from "../../../context";
import { Textfield } from "@digdir/design-system-react";

export const TextSettings = () => {
  const { t } = useTranslation();
  const { minLength = "", maxLength = "" } = useContext(FormBuilderContext).selectedItem;
  return (
    <>
      <Textfield
        name="minLength"
        label={t("settings_side_bar.minimum.length")}
        defaultValue={minLength}
        size="small"
        placeholder="Optional"
      />
      <Textfield
        name="maxLength"
        label={t("settings_side_bar.maximum.length")}
        defaultValue={maxLength}
        size="small"
        placeholder="Optional"
      />
    </>
  );
};

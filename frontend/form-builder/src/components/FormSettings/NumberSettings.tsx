import {useTranslation} from "react-i18next";
import React, {useContext} from "react";
import {FormBuilderContext} from "../../context";
import {Textfield} from "@digdir/design-system-react";

export const NumberSettings = () => {
    const { t } = useTranslation();
    const { selectedItem } = useContext(FormBuilderContext);
    return (
        <>
            <Textfield
                name="greaterThan"
                label={t("settings_side_bar.minimum.value")}
                defaultValue={selectedItem.greaterThan || ""}
                size="small"
                placeholder="Optional"
            />
            <Textfield
                name="lessThan"
                label={t("settings_side_bar.maximum.value")}
                defaultValue={selectedItem.lessThan || ""}
                size="small"
                placeholder="Optional"
            />
        </>
    );
};
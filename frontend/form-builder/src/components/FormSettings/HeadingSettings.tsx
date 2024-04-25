import { Button, Textfield } from "@digdir/design-system-react";
import React, { FormEvent, useContext } from "react";
import { FloppydiskFillIcon } from "@navikt/aksel-icons";
import { FormBuilderContext, FormItem } from "../../context";
import classes from "./FormSettings.module.css";
import { useTranslation } from "react-i18next";
import { cleanFormData } from "../../../../main-app/src/components/FormViewer/validationUtils";

export const HeadingSettings = () => {
  const { t } = useTranslation();
  const { form, setForm, setSelectedItem } = useContext(FormBuilderContext);

  const saveHeading = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const { title, description } = cleanFormData(formData) as FormItem;

    // TODO: Use Zod validation here.
    // See FormViewer for an example of how it can be done.

    setForm({ ...form, title, description });
    setSelectedItem(null);
  };

  return (
    <>
      <form onSubmit={saveHeading} className={classes.settingsContent}>
        <Textfield
          name="title"
          label={t("settings_side_bar.form.title")}
          defaultValue={form.title || ""}
          size="small"
          placeholder={"Required"}
        />
        <Textfield
          name="description"
          label={t("settings_side_bar.form.description")}
          defaultValue={form.description || ""}
          size="small"
        />
        <div className={classes.buttonContainer}>
          <Button type={"submit"} color={"success"} size={"small"}>
            <FloppydiskFillIcon />
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

import { Button, Textfield } from "@digdir/design-system-react";
import React, { useContext, useState } from "react";
import { FloppydiskFillIcon } from "@navikt/aksel-icons";
import { FormBuilderContext } from "../../context";
import classes from "./FormSettings.module.css";

export const HeadingSettings = () => {
  const { form, setForm, setSelectedItem } = useContext(FormBuilderContext);
  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description);

  const saveHeading = () => {
    setForm((prevState) => ({ ...prevState, title, description }));
    setSelectedItem(null);
  };

  return (
    <>
      <div className={classes.settingsContent}>
        <Textfield
          name="formTitle"
          label={"Form title"}
          defaultValue={form.title || ""}
          size="small"
          placeholder={"Required"}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textfield
          name="formDescription"
          label={"Form description"}
          defaultValue={form.description || ""}
          size="small"
          placeholder={"Required"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={classes.buttonContainer}>
          <Button color={"success"} size={"small"} onClick={() => saveHeading()}>
            <FloppydiskFillIcon />
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

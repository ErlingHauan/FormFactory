import { Alert, Button, Heading } from "@digdir/design-system-react";
import React, { FormEvent, useState } from "react";
import classes from "./FormViewer.module.css";
import { TasklistSendFillIcon } from "@navikt/aksel-icons";
import { FormRadio } from "../FormRadio";
import { FormTextfield } from "../FormTextfield";
import formSchema from "./formSchema";
import { cleanFormData, generateValidationSchema } from "./FormViewerUtils";
import { useTranslation } from "react-i18next";

export const FormViewer = (): React.JSX.Element => {
  const { t } = useTranslation();
  const [formErrors, setFormErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const cleanedFormData = cleanFormData(formData);
    const validationSchema = generateValidationSchema(formSchema);
    const result = validationSchema.safeParse(cleanedFormData);

    if ("error" in result) {
      setFormErrors(result.error.formErrors.fieldErrors);
      setFormAlert("error");
    } else {
      // To do: Pass form submission to backend
      setFormErrors({});
      setFormAlert("success");
    }
  };

  const getComponent = (component: FormComponent) => {
    const { componentType, name, label, required, choices } = component;

    return (
      componentType === "textfield" ? (
        <div key={name} className={classes.component}>
          <FormTextfield
            name={name}
            label={label}
            required={required}
            error={formErrors?.[name]}
          />
        </div>
      ) : (
        <div key={name} className={classes.component}>
          <FormRadio name={name} question={label} choices={choices} />
        </div>
      )
    );
  };

  return (
    <main className={classes.card}>
      <form onSubmit={handleSubmit}>
        <Heading level={1} size="xlarge">
          {formSchema.title}
        </Heading>
        {formSchema.components.map((component) => {
            return getComponent(component);
          }
        )}
        <div className={classes.buttonContainer}>
          <Button type="submit" size={"large"} fullWidth={false}>
            Submit form
            <TasklistSendFillIcon />
          </Button>
        </div>
      </form>
      {formAlert == "success" && <Alert severity="success">{t("form_viewer.success")}</Alert>}
      {formAlert == "error" && <Alert severity="danger">{t("form_viewer.error")}</Alert>}
    </main>
  );
};

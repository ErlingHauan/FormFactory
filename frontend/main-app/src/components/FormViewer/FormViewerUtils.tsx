import { z, ZodNumber, ZodOptional, ZodString } from "zod";

export const cleanFormData = (formData: FormData) => {
  const obj = Object.fromEntries(formData);
  const newObj = {};
  
  // It is necessary to turn empty fields into undefined.
  // z.coerce.number turns empty strings into 0, which does not validate correctly.
  for (const key in obj) {
    const value = obj[key];
    if (value === "") {
      newObj[key] = undefined;
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
};

export const generateValidationSchema = (form) => {
  const schemaShape = {};

  form.components.forEach((component) => {
    let validator: ZodString | ZodNumber | ZodOptional<ZodString | ZodNumber>;

    switch (component.inputType) {
      case "string":
        validator = z.string({
          required_error: "Field is required. ",
        });

        if (component.required) {
          validator = validator.min(1, { message: "Field is required. " });
        } else {
          validator = validator.optional();
        }

        if (component.minLength) {
          if (validator instanceof ZodString) {
            validator = validator.min(component.minLength, {
              message: `Field must have at least ${component.minLength} characters. `,
            });
          }
        }

        if (component.maxLength) {
          if (validator instanceof ZodString) {
            validator = validator.max(component.maxLength, {
              message: `Field must have more than ${component.maxLength} characters. `,
            });
          }
        }
        break;

      case "number":
        validator = z.coerce.number({
          invalid_type_error: "Number required. ",
        });

        if (!component.required) {
          validator = validator.optional();
        }

        if (component.greaterThan) {
          if (validator instanceof ZodNumber) {
            validator = validator.gt(component.greaterThan, {
              message: `Number must be greater than ${component.greaterThan}. `,
            });
          }
        }

        if (component.lessThan) {
          if (validator instanceof ZodNumber) {
            validator = validator.lt(component.lessThan, {
              message: `Number must be less than ${component.lessThan}. `,
            });
          }
        }
        break;

      default:
        validator = z.string();
    }
    schemaShape[component.id] = validator;
  });
  return z.object(schemaShape);
};

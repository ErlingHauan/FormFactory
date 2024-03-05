import { z } from "zod";

export const generateSchema = (form) => {
  let schemaShape = {};

  form.components.map((c) => {
    schemaShape[c.id] = z.string().min(c.minLength).max(c.maxLength);
  });

  return z.object(schemaShape);
};
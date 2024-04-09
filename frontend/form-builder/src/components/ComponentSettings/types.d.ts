export interface ComponentAsStrings {
  name: string;
  label: string;
  type: "input" | "radio";
  inputType?: "string" | "number";
  required?: "true";
  minLength?: string;
  maxLength?: string;
  lessThan?: string;
  greaterThan?: string;
  radioChoices?: string;
}

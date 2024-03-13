interface FormComponent {
  name: string;
  label: string;
  type: string;
  inputType?: string;
  required?: boolean;
  greaterThan?: number;
  lessThan?: number;
  radioChoices?: string[];
  minLength?: number;
  maxLength?: number;
}

interface Form {
  id: number;
  title: string;
  published: string;
  components: FormComponent[];
}

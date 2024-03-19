interface FormComponent {
  name: string;
  label: string;
  componentType: string;
  inputType?: string;
  required?: boolean;
  greaterThan?: number;
  lessThan?: number;
  choices?: string[];
  minLength?: number;
  maxLength?: number;
}

interface Form {
  id: number;
  title: string;
  published: string;
  components: FormComponent[];
}

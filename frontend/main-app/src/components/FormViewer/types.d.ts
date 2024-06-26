interface FormComponent {
  name: string;
  order?: number;
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
  id?: string;
  user: string;
  organization?: string;
  title: string;
  description: string;
  status: string;
  published: date;
  expires: string;
  components: FormComponent[];
}

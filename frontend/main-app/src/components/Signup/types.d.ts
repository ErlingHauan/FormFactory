export interface IValidateSignupForm {
  (params: {
    signupForm: SignupForm;
    setFieldErrors: (value: SignupFormError | null) => void;
  }): boolean;
}

export interface SignupForm {
  email?: string;
  organization?: string;
  password?: string;
  passwordRepeat?: string;
}

export interface SignupFormError {
  email?: string[];
  password?: string[];
  passwordRepeat?: string[];
}

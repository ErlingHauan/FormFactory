export interface IValidateLoginForm {
  (params: {
    loginForm: LoginForm;
    setFormErrors: (value: LoginFormError | null) => void;
  }): boolean;
}

export interface LoginForm {
  email?: string;
  password?: string;
}

export interface LoginFormError {
  email?: string[];
  password?: string[];
}

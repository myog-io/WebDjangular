export interface FormioConditionalOptions {
  show?: string;
  when?: any;
  eq?: any;
}
export interface FormioValidateOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string;
  customPrivate?: boolean;
}
export interface FormioComponentOptions<T, V> {
  defaultValue?: T | T[];
  type?: string;
  key?: string;
  label?: string;
  input?: boolean;
  required?: boolean;
  multiple?: boolean;
  protected?: boolean;
  unique?: boolean;
  persistent?: boolean;
  tableView?: boolean;
  tabindex?:number;
  leftIcon?:string;
  rightIcon?:string;
  cssClass?:string;
  size?: string;
  block?: boolean;
  lockKey?: boolean;
  validate?: V;
  action?: string;
  disableOnInvalid?: boolean;
  theme?: string;
  autofocus?: boolean;
  conditional?: FormioConditionalOptions;
  customConditional?: string;
}
export interface FormioRefreshValue {
  property?: string;
  value?: object;
  form?: object;
  submission?: object;
}
export interface FormioAccessSetting {
  type: string;
  roles: string[];
}
export interface FormioForm {
  title?: string;
  display?: string;
  name?: string;
  path?: string;
  type?: string;
  project?: string;
  template?: string;
  components?: Array<FormioComponentOptions<any, FormioValidateOptions>>;
  tags?: string[];
  access?: FormioAccessSetting[];
  submissionAccess?: FormioAccessSetting[];
}
export interface FormioAlertsOptions {
  submitMessage: string;
}
export interface FormioErrorsOptions {
  message: string;
}
export declare class FormioError {
  message: string;
  component: FormioComponentOptions<any, FormioValidateOptions>;
  constructor(message: string, component: FormioComponentOptions<any, FormioValidateOptions>);
}
export declare type FormioSubmissionCallback = (error: FormioError, submission: object) => void;
export declare type FormioBeforeSubmit = (submission: object, callback: FormioSubmissionCallback) => void;
export interface FormioHookOptions {
  beforeSubmit: FormioBeforeSubmit;
}
export interface FormioOptions {
  errors?: FormioErrorsOptions;
  alerts?: FormioAlertsOptions;
  disableAlerts?: boolean;
  i18n?: object;
  fileService?: object;
  hooks?: FormioHookOptions;
}

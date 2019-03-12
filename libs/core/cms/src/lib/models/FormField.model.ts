import { Attribute, BelongsTo, JsonApiModelConfig } from "angular2-jsonapi";
import { AbstractModel } from "@core/data/src/lib/models";
import { ExtraOptions } from "@core/decorator/src/lib/ExtraOptions.decorator";
import { SmartTableSettings } from "@core/data/src/lib/data-store";
import { Validators, FormControl } from "@angular/forms";
import { BuilderFormFieldConfig } from "@core/builder/src/lib/interfaces/form-config.interface";


export const LabelPostionOptions = [
  { id: 'default', name: 'default' },
  { id: 'above', name: 'above' },
  { id: 'below', name: 'below' },
];

export const FieldOptions = [
  { id: 'text', name: "Text" },
  { id: 'button', name: "Button" },
  { id: 'select', name: "Select" },
  { id: 'codeEditor', name: "Code Editor" },
  { id: 'formBuilder', name: "Form Builder" },
  { id: 'formArray', name: "Form Array" },
  { id: 'formGroup', name: "Form Group" },
  { id: 'switch', name: "Switch" },
  { id: 'checkbox', name: "Checkbox" },
  { id: 'datepicker', name: "Datepicker" },
  { id: 'jsonLogic', name: "Json Logic" },
];
export const InputTypes = [
  { id: "text", name: "Text" },
  { id: "button", name: "Button" },
  { id: "checkbox", name: "Checkbox" },
  { id: "color", name: "Color" },
  { id: "date", name: "Date" },
  { id: "datetime-local", name: "Datetime Local" },
  { id: "email", name: "Email" },
  { id: "file", name: "File" },
  { id: "hidden", name: "Hidden" },
  { id: "image", name: "Image" },
  { id: "month", name: "Month" },
  { id: "password", name: "Password" },
  { id: "radio", name: "Radio" },
  { id: "range", name: "Range" },
  { id: "reset", name: "Reset" },
  { id: "search", name: "Search" },
  { id: "submit", name: "Submit" },
  { id: "tel", name: "Tel" },
  { id: "time", name: "Time" },
  { id: "url", name: "Url" },
  { id: "week", name: "Week" },
  { id: "multiple", name: "Multiple" },
];

@JsonApiModelConfig({
  type: 'FormField',
  modelEndpointUrl: 'cms/form-field',
})
export class FormFieldModel extends AbstractModel {
  private _config: BuilderFormFieldConfig;


  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Label',
    wrapper_class: 'col-4',
  })
  label: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Slug',
    wrapper_class: 'col-4',
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Placeholder',
    wrapper_class: 'col-4',
  })
  placeholder: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'select',
    label: 'Type',
    options: FieldOptions,
    wrapper_class: 'col-6',
    value: FieldOptions[0].id
    //wrapper_class,
    //validators
  })
  field_type: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'select',
    label: 'Input Types',
    options: InputTypes,
    value: InputTypes[0].id,
    wrapper_class: 'col-6',
  })
  input_type: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Is required?',
    value: false,
    wrapper_class: 'col-4',
  })
  required: boolean;


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'select',
    label: 'Label Position',
    options: LabelPostionOptions,
    value: LabelPostionOptions[0].id,
    wrapper_class: 'col-4',
  })
  label_position: 'default' | 'above' | 'below'


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'number',
    label: 'Position',
    wrapper_class: 'col-4',
    value: "0",
  })
  position: number;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Wrapper Class',
    wrapper_class: 'col-6',
  })
  wrapper_class: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Element Class',
    wrapper_class: 'col-6',
  })
  element_class: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Default Value',
    wrapper_class: 'col-12',
  })
  default_value: string;


  @Attribute()
  @ExtraOptions({
    type: 'codeEditor',
    label: 'Extra Data',
    options: {
      language: 'json'
    }
  })
  data?: any;

  @BelongsTo({ key: 'Form' })
  form: any;
  //@ExtraOptions({
  //    type: 'hidden',
  //})
  get formControl(): FormControl {
    let validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    return new FormControl(this.default_value, validators)
  }
  public generateConfig() {
    this._config = {
      type: this.field_type,
      //validators?: Validators[];
      //disabled?: boolean;
      label: this.label,
      name: this.slug,
      //form_group_name: string;
      //model?: any;//AbstractModel;
      //options?: any;
      //options_include?: string;
      //addTags?: boolean;
      //multiple?: boolean;
      placeholder: this.placeholder,
      //validation?: ValidatorFn[];
      //value: this.default_value,
      default: this.default_value,
      conditionalValue: this.data.conditional_value || null,
      wrapper_class: this.wrapper_class,
      element_class: this.element_class,
      label_position: this.label_position,
      inputType: this.input_type,
      conditional: this.data.conditional || null,
      //display?: boolean;
      //switch_vertical?: boolean;
      //switch_first_label?: string;
      //switch_second_label?: string;
      //switch_first_value?: any;
      //switch_second_value?: any;
      //fields?: BuilderFormFieldConfig[]; // Children of this Form
      //smart_table_mode?: 'external' | 'inline';
      //backendResourceName?: string;
      //formType?: any;
      //sort: this.position;
      //displayGroup: string;
      //copyOptions?: BuilderFormCopyArray
      //json_logic_options_url?: string;
    }
  }
  get config(): BuilderFormFieldConfig {
    return this._config;
  }
  public toString = (): string => {
    return `${this.label}(${this.slug})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      label: {
        title: 'Name',
        type: 'text',
      },
      slug: {
        title: 'Code',
        type: 'text',
      },
      field_type: {
        title: 'Type',
        type: 'text',
      },
      position: {
        title: 'Postion',
        type: 'text',
        sort: true,
        sortDirection: 'asc'
      }
    },
  };
}

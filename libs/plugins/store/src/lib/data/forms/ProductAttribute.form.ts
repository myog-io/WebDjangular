import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';

import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormFieldConfig} from '@webdjangular/core/builder';

import {SmartTableSettings} from '@webdjangular/core/data';
import {ProductTypeModel} from "../models/ProductType.model";
import {ProductAttributeTypeValues, ProductClasses} from "../interfaces/Product.interface";


export class ProductAttributeForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      code: {
        title: 'Code',
        type: 'text',
      }
    },
  };


  public formFields = {
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    code: {
      type: FormControl,
      validators: [Validators.required]
    },
    required: {
      type: FormControl,
      validators: [Validators.required]
    },
    type: {
      type: FormControl,
      validators: [Validators.required]
    },
  };

  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Code',
      name: 'code',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'switch',
      label: 'Required',
      name: 'required',
      wrapper_class: 'col-5',
      value: false,
      placeholder: '',
    },
    {
      type: 'select',
      label: 'Type',
      name: 'type',
      wrapper_class: 'col-12',
      value: ProductAttributeTypeValues.text,
      options: [
        {label:"Text", value: ProductAttributeTypeValues.text },
        {label:"Select", value: ProductAttributeTypeValues.select },
        {label:"Text Area", value: ProductAttributeTypeValues.ckeditor },
        {label:"Text Html",value: ProductAttributeTypeValues.codeEditor },
      ]
    },
  ]
}

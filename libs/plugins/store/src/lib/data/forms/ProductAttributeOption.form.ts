import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';

import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormFieldConfig} from '@webdjangular/core/builder';

import {SmartTableSettings} from '@webdjangular/core/data';
import {ProductTypeModel} from "../models/ProductType.model";
import {ProductAttributeTypeValues, ProductClasses} from "../interfaces/Product.interface";


export class ProductAttributeOptionForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      label: {
        title: 'Label',
        type: 'text',
      },
      value: {
        title: 'Value',
        type: 'text',
      }
    },
  };


  public formFields = {
    label: {
      type: FormControl,
      validators: [Validators.required]
    },
    value: {
      type: FormControl,
      validators: [Validators.required]
    }
  };

  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Label',
      name: 'label',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Value',
      name: 'value',
      wrapper_class: 'col-12',
      placeholder: '',
    }
  ]
}

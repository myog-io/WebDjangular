import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';

import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormFieldConfig} from '@webdjangular/core/builder';

import {SmartTableSettings} from '@webdjangular/core/data';
import {ProductAttributeModel} from "../models/ProductAttribute.model";

export class ProductTypeForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      created: {
        title: 'Created',
        type: 'text',
      },
      updated: {
        title: 'Created',
        type: 'text',
      }
    },
  };
  public formFields = {
    id: {
      type: FormControl
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    attributes: {
      type: FormArray,
      model: ProductAttributeModel,
    },
  }

  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'formArray',
      label: 'Attributes',
      name: 'attributes',
      smart_table_mode: 'external',

    },
  ]
}

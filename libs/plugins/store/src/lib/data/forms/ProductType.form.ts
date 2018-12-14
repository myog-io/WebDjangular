import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings } from '@webdjangular/core/data';
import { ProductAttributeModel } from "../models/ProductAttribute.model";
import { ProductClasses } from '../interfaces/Product.interface';

export class ProductTypeForm extends AbstractForm {
  /*
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
    product_class: {
      type: FormControl,
      validators: [Validators.required]
    },
    attributes: {
      type: FormArray,
      model: ProductAttributeModel,
    },
    variant_attributes: {
      type: FormArray,
      model: ProductAttributeModel,
    },


  };

  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'select',
      label: 'Product Class',
      name: 'product_class',
      wrapper_class: 'col-6',
      value: ProductClasses.simple,
      options: [
        { label: "Simple Product", value: ProductClasses.simple },
        { label: "Bundle Product", value: ProductClasses.bundle },
        { label: "Variant Product", value: ProductClasses.variant },
      ]
    },
    {
      type: 'formArray',
      label: 'Attributes',
      name: 'attributes',
      smart_table_mode: 'external',
    },
    {
      type: 'formArray',
      label: 'Variant Attributes',
      name: 'variant_attributes',
      smart_table_mode: 'external',
      conditional: {
        '==': [
          {var: 'product_class'},
          ProductClasses.variant
        ]
      }
    },

  ]
  */
}

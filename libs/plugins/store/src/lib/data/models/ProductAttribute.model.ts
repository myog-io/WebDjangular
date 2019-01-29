import {Attribute, JsonApiModelConfig, BelongsTo, HasMany} from 'angular2-jsonapi';
import {ProductAttributeTypeValues, ProductClasses} from "../interfaces/Product.interface";
import {ProductAttributeOptionModel} from "./ProductAttributeOption.model";
import {FormArray, Validators} from "@angular/forms";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';



@JsonApiModelConfig({
  type: 'ProductAttribute',
  modelEndpointUrl: 'store/product-attribute',
})
export class ProductAttributeModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Attribute Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter the attribute name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Internal Code',
    wrapper_class: 'col-6',
    placeholder: 'Enter the attribute internal code'
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    //validators: [Validators.required],
    type: 'select',
    label: 'Type',
    wrapper_class: 'col-6',
    value: ProductAttributeTypeValues.text,
    options: [
      {label: "Text", value: ProductAttributeTypeValues.text},
      {label: "Select", value: ProductAttributeTypeValues.select},
    ],
  })
  class_type: ProductAttributeTypeValues;

  @Attribute()
  @ExtraOptions({
    //validators: [Validators.required],
    type: 'switch',
    label: 'Is required?',
    wrapper_class: 'col-6'
  })
  required: boolean;

  @Attribute()
  @ExtraOptions({
    formType: FormArray,
    type: 'formArray',
    label: 'Options',
    model: ProductAttributeOptionModel,
    conditional: {
      '==': [
        {var: 'type'},
        ProductAttributeTypeValues.select
      ]
    }
  })
  options: ProductAttributeOptionModel[];


  @HasMany({key:'ProductType'})
  product_type_set: object[];

  permissions: PermissionModel[];


  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      code: {
        title: 'Code',
        type: 'text',
      }
    }
  };

}

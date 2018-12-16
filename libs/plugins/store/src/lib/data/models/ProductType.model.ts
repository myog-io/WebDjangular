import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {ProductClasses} from '../interfaces/Product.interface';
import {ExtraOptions} from "@webdjangular/core/decorator";
import {FormArray, Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";
import {ProductAttributeInterface, ProductAttributeModel} from "./ProductAttribute.model";
import {RangeModel} from "@webdjangular/plugins/provider-data";


@JsonApiModelConfig({
  type: 'ProductType',
  modelEndpointUrl: 'store/product-type',
})
export class ProductTypeModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter the Product Type name',
    sort: 0,
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'select',
    label: 'Product Class',
    wrapper_class: 'col-6',
    value: ProductClasses.simple,
    options: [
      {label: "Simple Product", value: ProductClasses.simple},
      {label: "Variant Product", value: ProductClasses.variant},
      {label: "Bundle Product", value: ProductClasses.bundle},
    ],
    sort: 1
  })
  product_class: ProductClasses;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'formArray',
    formType: FormArray,
    label: 'Attributes',
    smart_table_mode: 'external',
    model: ProductAttributeModel,
    sort: 2
  })
  attributes: ProductAttributeInterface[];


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'formArray',
    formType: FormArray,
    label: 'Variant Attributes',
    smart_table_mode: 'external',
    model: ProductAttributeModel,
    sort: 3,
    conditional: {
      '==': [
        {var: 'product_class'},
        ProductClasses.variant
      ]
    }
  })
  variant_attributes: ProductAttributeInterface[];


  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `${this.name}`;
  };

  public static smartTableOptions: SmartTableSettings = {
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
        title: 'Updated',
        type: 'text',
      }
    },
  };
}

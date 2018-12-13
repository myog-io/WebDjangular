import {JsonApiModelConfig, Attribute, HasMany, BelongsTo} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {ProductTypeForm} from '../forms/ProductType.form';
import {ProductClasses} from '../interfaces/Product.interface';
import {ExtraOptions} from "@webdjangular/core/decorator";
import {FormArray, Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";
import {StreetInterface} from "@webdjangular/plugins/provider-data";
import {ProductAttributeInterface, ProductAttributeModel} from "./ProductAttribute.model";


@JsonApiModelConfig({
  type: 'ProductType',
  modelEndpointUrl: 'store/product-type',
})
export class ProductTypeModel extends AbstractModel {
  public static formClassRef = ProductTypeForm;
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
      {label: "Bundle Product", value: ProductClasses.bundle},
      {label: "Variant Product", value: ProductClasses.variant},
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

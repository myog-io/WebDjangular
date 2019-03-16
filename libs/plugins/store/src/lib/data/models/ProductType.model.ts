import { Attribute, JsonApiModelConfig, HasMany } from 'angular2-jsonapi';
import { ProductClasses } from '../interfaces/Product.interface';
import { ProductAttributeModel } from './ProductAttribute.model';
import { FormArray, Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'ProductType',
  modelEndpointUrl: 'store/product-type'
})
export class ProductTypeModel extends AbstractModel {
  public static include = 'data';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter the Product Type name',
    sort: 0
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
    placeholder: 'Enter the Product Type code',
    sort: 0
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'ngSelect',
    label: 'Product Class',
    wrapper_class: 'col-6',
    value: ProductClasses.simple,
    options: [
      { label: 'Simple Product', value: ProductClasses.simple },
      { label: 'Variant Product', value: ProductClasses.variant },
      { label: 'AddOn Product', value: ProductClasses.addon },
      { label: 'Bundle Product', value: ProductClasses.bundle }
    ],
    sort: 1
  })
  product_class: ProductClasses;

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    label: 'Attributes',
    wrapper_class: 'col-12',
    formType: FormArray,
    model: ProductAttributeModel,
    sort: 2,
    name: 'data'
  })
  data: ProductAttributeModel[];

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}

  public toString = (): string => {
    return `${this.name}`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      product_class: {
        title: 'Product Class',
        type: 'text'
      },
      updated: {
        title: 'Updated',
        type: 'text'
      }
    }
  };
}

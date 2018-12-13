import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { ProductForm } from '../forms/Product.form';
import { ProductClasses, ProductPrice } from '../interfaces/Product.interface';
import { ProductTypeModel } from './ProductType.model';
import {SEOModel} from "../../../../../../core/data/src/lib/models/SEO.model";
import {applyMixins} from "rxjs/internal-compatibility";
import {FormControl, Validators} from "@angular/forms";



@JsonApiModelConfig({
  type: 'Product',
  modelEndpointUrl: 'store/product',
})
export class ProductModel extends AbstractModel{
  public static formClassRef = ProductForm;
  public static include = 'product_type';

  @Attribute()
  id: string;

  @Attribute()
  sku: string;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'ProductType'
  })
  product_type: ProductTypeModel;


  @Attribute()
  name: string;

  @Attribute()
  product_class: ProductClasses;

  @Attribute()
  pricing: ProductPrice;

  @Attribute()
  slug: string;

  @Attribute()
  description: string;

  @Attribute()
  track_inventory: string;

  @Attribute()
  quantity: string;

  @Attribute()
  quantity_allocated: string;

  @Attribute()
  cost: string;

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

}
applyMixins(ProductModel, [SEOModel]);

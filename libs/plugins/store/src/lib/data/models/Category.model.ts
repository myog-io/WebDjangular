import { Attribute, JsonApiModelConfig, HasMany } from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { Validators, FormArray } from '@angular/forms';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { ProductModel } from './Product.model';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@JsonApiModelConfig({
  type: 'ProductCategory',
  modelEndpointUrl: 'store/category'
})
export class CategoryModel extends AbstractModel {
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Category name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, WDAValidators.slug],
    type: 'text',
    label: 'Category URL',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Category URL'
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'codeEditor',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: 'Enter Page Title'
  })
  description: string;

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    formType: FormArray,
    label: 'Product Parent',
    model: ProductModel
  })
  products: ProductModel[];

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) { }

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      description: {
        title: 'Description',
        type: 'text'
      }
    }
  };
}

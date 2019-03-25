import {
  Attribute,
  BelongsTo,
  HasMany,
  JsonApiModelConfig
} from 'angular2-jsonapi';
import { CityModel } from './City.model';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'Condo',
  modelEndpointUrl: 'provider/condo'
})
export class CondoModel extends AbstractModel {
  public static include = 'city,products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
  })
  name: string;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    type: 'select',
    validators: [Validators.required],
    label: 'City',
    wrapper_class: 'col-6',
    model: CityModel,
  })
  city: CityModel;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    model: ProductModel,
    type: 'checkbox',
    label: 'Products'
  })
  products: ProductModel;

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      city: {
        title: 'City',
        type: 'text',
        valuePrepareFunction: (cell, row) => {
          return `${cell.name} (${cell.id})`;
        }
      }
    }
  };
}

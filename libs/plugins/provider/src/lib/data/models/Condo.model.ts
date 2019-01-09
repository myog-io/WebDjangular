import {Attribute, BelongsTo, HasMany, JsonApiModelConfig} from "angular2-jsonapi";
import {AbstractModel} from "@webdjangular/core/data-models";
import {CityModel} from "./City.model";
import {ProductModel} from "libs/plugins/store/src/lib/data/models/Product.model";
import {SmartTableSettings} from "@webdjangular/core/data";
import {ExtraOptions} from "@webdjangular/core/decorator";
import {FormArray, FormGroup, Validators} from "@angular/forms";
import {BlockModel} from "@webdjangular/core/cms-models";

@JsonApiModelConfig({
  type: 'Condo',
  modelEndpointUrl: 'provider/condo',
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
  })
  name: string;

  @BelongsTo()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'relationship',
    label: 'City',
    wrapper_class: 'col-12',
    model: CityModel,
    backendResourceName: 'City'
  })
  city: CityModel;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    model: ProductModel,
    type: 'checkbox',
    label: 'Products',
  })
  products: ProductModel;

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      city: {
        title: 'City',
        type: 'text',
        valuePrepareFunction: (cell, row) => {
          return `${cell.name} (${cell.id})`
        }
      }
    },
  };
}

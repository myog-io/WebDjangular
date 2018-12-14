import { JsonApiModelConfig, Attribute, HasMany } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { ExtraOptions } from "@webdjangular/core/decorator";
import { Validators, FormArray } from "@angular/forms";

@JsonApiModelConfig({
  type: 'Channel',
  modelEndpointUrl: 'provider/channel',
})
export class ChannelModel extends AbstractModel {
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
  })
  name: string;


  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Logo',
  })
  logo: string;


  @Attribute()
  @ExtraOptions({
    type: 'select',
    label: 'Groups',
  })
  groups: string[];


  @Attribute()
  @ExtraOptions({
    type: 'select',
    label: 'Types',
  })
  types: string[];


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'number',
    label: 'Channel Number',
  })
  number: number


  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Positon',
  })
  position: number

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    type: 'checkbox',
    label: 'Products',
    options_model: ProductModel
  })
  products: ProductModel

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      email: {
        title: 'Email',
        type: 'text',
      }
    },
  };

}

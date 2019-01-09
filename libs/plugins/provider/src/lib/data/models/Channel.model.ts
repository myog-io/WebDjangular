import { Attribute, HasMany, JsonApiModelConfig } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { ExtraOptions } from "@webdjangular/core/decorator";
import { FormArray, Validators } from "@angular/forms";
import { SmartTableSettings } from "@webdjangular/core/data";

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
    formType: FormArray,
    type: 'select',
    label: 'Groups',
    addTags: true,
    multiple: true,
  })
  groups: string[];

  @Attribute()
  @ExtraOptions({
    formType: FormArray,
    type: 'select',
    label: 'Types',
    addTags: true,
    multiple: true,
  })
  types: string[];

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'number',
    label: 'Channel Number',
  })
  number: number;


  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Position',
  })
  position: number;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    type: 'checkbox',
    label: 'Products',
    model: ProductModel,
  })
  products: ProductModel;

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      logo: {
        title: 'Logo',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<img src="${cell}" height="50px" alt="logo"/>`
        }
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      number: {
        title: 'Number',
        type: 'text',
      },
      groups: {
        title: 'Groups',
        type: 'text',
        filter: 'groups_in'
      },
      types: {
        title: 'Types',
        type: 'text',
      }

    },
  };

}

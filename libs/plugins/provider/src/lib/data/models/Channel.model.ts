import { Attribute, HasMany, JsonApiModelConfig } from 'angular2-jsonapi';
import { FormArray, Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'Channel',
  modelEndpointUrl: 'provider/channel'
})
export class ChannelModel extends AbstractModel {
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Logo'
  })
  logo: string;

  @Attribute()
  @ExtraOptions({
    type: 'ngSelect',
    label: 'Groups',
    addTags: true,
    multiple: true
  })
  groups: string[];

  @Attribute()
  @ExtraOptions({
    type: 'ngSelect',
    label: 'Types',
    addTags: true,
    multiple: true
  })
  types: string[];

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'number',
    label: 'Channel Number'
  })
  number: number;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Position'
  })
  position: number;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    type: 'relationship_checkbox',
    label: 'Products',
    model: ProductModel
  })
  products: ProductModel;

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      logo: {
        title: 'Logo',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<img src="${cell}" height="50px" alt="logo"/>`;
        }
      },
      name: {
        title: 'Name',
        type: 'text'
      },
      number: {
        title: 'Number',
        type: 'text'
      },
      groups: {
        title: 'Groups',
        type: 'text',
        filter: 'groups_in'
      },
      types: {
        title: 'Types',
        type: 'text'
      }
    }
  };
}

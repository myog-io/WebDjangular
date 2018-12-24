import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';
import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {RangeModel} from './Range.model';
import {StreetModel} from './Street.model';
import {ExtraOptions} from '@webdjangular/core/decorator';
import {SmartTableSettings} from '@webdjangular/core/data';
import {FormArray, Validators} from '@angular/forms';
import {CityModel} from "@webdjangular/plugins/provider-data";


@JsonApiModelConfig({
  type: 'PostalCodeRange',
  modelEndpointUrl: 'provider/attribute/postal_code',
})
export class PostalCodeModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Start',
    wrapper_class: 'col-6',
    placeholder: 'Enter where the Postal Code range begins',
  })
  start: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'End',
    wrapper_class: 'col-6',
    placeholder: 'Enter where the Postal Code range ends',
  })
  end: string;

  @BelongsTo()
  @ExtraOptions({
    type: 'relationship',
    label: 'City',
    wrapper_class: 'col-6',
    options_model: CityModel,
    backendResourceName: 'City'
  })
  city: CityModel;

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
    return `${this.name} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'start',
        type: 'text',
      },
      short_name: {
        title: 'end',
        type: 'text',
      },
    },
  };
}

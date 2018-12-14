import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { RangeInterface, RangeModel } from './Range.model';
import { StreetInterface, StreetModel } from './Street.model';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { SmartTableSettings } from '@webdjangular/core/data';
import { Validators, FormArray } from '@angular/forms';


@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class CityModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter City Name',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Short Name',
    wrapper_class: 'col-6',
    placeholder: 'Entery City Short Name (NY)',
  })
  short_name: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
    placeholder: 'Entery City Short Name (NY)',
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Postal Codes',
    model: RangeModel
  })
  postal_codes: RangeInterface[];

  @Attribute()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Streets',
    smart_table_mode: 'external',
    model: StreetModel
  })
  streets: StreetInterface[];


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
      id: {
        title: '#',
        type: 'text',
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      short_name: {
        title: 'Short Name',
        type: 'text',
      },
    },
  };
}


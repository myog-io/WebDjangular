import {Attribute, HasMany, JsonApiModelConfig} from 'angular2-jsonapi';
import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {StreetModel} from './Street.model';
import {ExtraOptions} from '@webdjangular/core/decorator';
import {SmartTableSettings} from '@webdjangular/core/data';
import {FormArray, Validators} from '@angular/forms';
import {PostalCodeRangeInterface, PostalCodeRangeModel} from "./PostalCodeRangeModel";


enum DiplayGroups {
  city = 'City',
  postal_codes = 'Postal Codes',
  streets = 'Streets'
}

@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class CityModel extends AbstractModel {
  public static include = 'postal_codes';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter City Name',
    displayGroup: DiplayGroups.city
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Short Name',
    wrapper_class: 'col-6',
    placeholder: 'Entery City Short Name (NY)',
    displayGroup: DiplayGroups.city
  })
  short_name: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
    placeholder: 'Entery City Short Name (NY)',
    displayGroup: DiplayGroups.city
  })
  code: string;


  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Postal Codes',
    wrapper_class: 'col-12',
    options_model: PostalCodeRangeModel,
    model: PostalCodeRangeModel,
    displayGroup: DiplayGroups.postal_codes
  })
  postal_codes: PostalCodeRangeModel[];


  @Attribute()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Streets',
    smart_table_mode: 'external',
    model: StreetModel,
    displayGroup: DiplayGroups.streets
  })
  streets: StreetModel[];


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

  public displayGroups = [
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: DiplayGroups.city,
          title: 'City',
        }
      ]
    },
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: DiplayGroups.postal_codes,
          title: '',
          card_wrapper: false
        }
      ]
    },
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: DiplayGroups.streets,
          title: '',
          card_wrapper: false
        }
      ]
    }
  ];


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


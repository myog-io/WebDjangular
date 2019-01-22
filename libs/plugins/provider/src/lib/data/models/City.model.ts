import {Attribute, HasMany, JsonApiModelConfig} from 'angular2-jsonapi';
import {StreetModel} from './Street.model';
import {FormArray, Validators} from '@angular/forms';
import {PostalCodeRangeModel} from "./PostalCodeRangeModel";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { ProductClasses } from '@plugins/store/src/lib/data/interfaces/Product.interface';


enum DiplayGroups {
  city = 'City',
  postal_codes = 'Postal Codes',
  streets = 'Streets',
  products = 'Products',
}

@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class CityModel extends AbstractModel {
  public static include = 'postal_codes,streets,products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    displayGroup: DiplayGroups.city
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Short Name',
    wrapper_class: 'col-6',
    displayGroup: DiplayGroups.city
  })
  short_name: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-4',
    displayGroup: DiplayGroups.city
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    inputType: 'number',
    label: 'Latitude',
    wrapper_class: 'col-4',
    displayGroup: DiplayGroups.city
  })
  lat: number;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    inputType: 'number',
    label: 'Longitude',
    wrapper_class: 'col-4',
    displayGroup: DiplayGroups.city
  })
  long: number;

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Postal Codes',
    wrapper_class: 'col-12',
    model: PostalCodeRangeModel,
    displayGroup: DiplayGroups.postal_codes
  })
  postal_codes: PostalCodeRangeModel[];


  @HasMany()
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
  neighborhood: string;

  @Attribute()
  street: string;

  @Attribute()
  state: string;

  @Attribute()
  postal_code: string;

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    formType: FormArray,
    label: 'Products',
    model: ProductModel,
    options: {product_class: ProductClasses.simple},
    displayGroup: DiplayGroups.products
  })
  addons: ProductModel;

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
          name: DiplayGroups.products,
          title: '',
          card_wrapper: true
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
      lat: {
        title: 'Latitude',
        type: 'text',
      },
      long: {
        title: 'Longitude',
        type: 'text',
      }
    },
  };
}


import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { CityForm } from '../forms/City.form';


export interface RangeInterface {
  start: number;
  end: number;
}

export interface StreetInterface {
  name: string;
  short_name?: string;
  numbers: RangeInterface[];
}


@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class CityModel extends AbstractModel {
  public static formClassRef = CityForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  short_name: string;

  @Attribute()
  code: string;

  @Attribute()
  postal_codes: RangeInterface[];

  @Attribute()
  streets: StreetInterface[];


  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[]

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

}


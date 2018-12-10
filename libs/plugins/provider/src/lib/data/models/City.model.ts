import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { CityForm } from '../forms/City.form';
import { RangeInterface } from './Range.model';
import { StreetInterface } from './Street.model';


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
  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  }
}


import {
    JsonApiModelConfig,
    Attribute,
    HasMany,
    BelongsTo
  } from 'angular2-jsonapi';
  
  import { AbstractModel } from './Abstract.model';
  import { PermissionModel } from '@core/users/src/lib/models';
  
  @JsonApiModelConfig({
    type: 'core_address'
  })
  export class AddressModel extends AbstractModel {
    @Attribute()
    id: string;
    
    @Attribute()
    first_name: string;

    @Attribute()
    last_name: string;

    @Attribute()
    company_name: string;

    @Attribute()
    street_address_1: string;

    @Attribute()
    street_address_2: string;

    @Attribute()
    city: string;

    @Attribute()
    state: string;

    @Attribute()
    postal_code: string;

    @Attribute()
    country: any;

    @Attribute()
    country_area: string;

    @Attribute()
    phone: string;
  
    get pk() {
      return this.id;
    }
  
    set pk(value) {}

    
  }
  
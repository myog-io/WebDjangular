import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from './Abstract.model';
import { PropertyConverter } from 'angular2-jsonapi';


@JsonApiModelConfig({
  type: 'Address',
  modelEndpointUrl: 'address',
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
  street_address_3: string;

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

  set pk(value) {
  }
}

export class AddressConverter implements PropertyConverter {
  mask(value: any): any {
    return value;
  }
  unmask(value: any): any {
    return value;
  }
}

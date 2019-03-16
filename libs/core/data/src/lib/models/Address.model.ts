import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PropertyConverter } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'Address',
  modelEndpointUrl: 'address'
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
  number: string;

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

  set pk(value) {}

  get label_line_one(): string {
    return `${this.street_address_1}, ${this.number} - ${
      this.street_address_3
    }`;
  }

  get label_line_two(): string {
    return `${this.street_address_2}`;
  }

  get label_line_three(): string {
    return `${this.city}, ${this.state} ${this.postal_code}`;
  }
  get full_label(): string {
    let label = `${this.label_line_one}`;
    if (this.street_address_2) {
      label += `<br>${this.label_line_two}`;
    }
    label += `<br>${this.label_line_three}`;
    return label;
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

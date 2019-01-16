import {
  JsonApiModelConfig,
  Attribute,
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import {Validators} from "@angular/forms";
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '../data-store';

@JsonApiModelConfig({
  type: 'core_website'
})
export class CoreWebsiteModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Domain',
    placeholder: 'Enter the Website Domain'
  })
  domain: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Code',
    placeholder: 'Enter the code'
  })
  code: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;



  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}

   public static smartTableOptions: SmartTableSettings = {
    columns: {
      domain: {
        title: 'Domain',
        type: 'text'
      },
      code: {
        title: 'Code',
        type: 'text'
      },
    }
  };

}

import {
  JsonApiModelConfig,
  Attribute,
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

import { CoreWebsiteForm } from '../forms/CoreWebsite.form';
import {SmartTableSettings} from "@webdjangular/core/data";
import {ExtraOptions} from "@webdjangular/core/decorator";
import {Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'core_website'
})
export class CoreWebsiteModel extends AbstractModel {
  public static formClassRef = CoreWebsiteForm;

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
      id: {
        title: 'ID',
        type: 'number'
      },
      domain: {
        title: 'Domain',
        type: 'string'
      },
      code: {
        title: 'Code',
        type: 'string'
      },
    }
  };

}

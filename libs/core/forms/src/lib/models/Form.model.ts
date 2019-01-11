import {JsonApiModelConfig, Attribute, HasMany, BelongsTo} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';

import {FormForm} from '../forms/Form.form';


@JsonApiModelConfig({
  type: 'Form',
  modelEndpointUrl: 'form',

})
export class FormModel extends AbstractModel {

  public static formClassRef = FormForm;

  @Attribute()
  id: string;

  @Attribute()
  title: string;

  @Attribute()
  slug: string;

  @Attribute()
  content: object;

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

}


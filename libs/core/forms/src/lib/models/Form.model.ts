import {JsonApiModelConfig, Attribute, HasMany, BelongsTo} from 'angular2-jsonapi';
import {FormForm} from '../forms/Form.form';
import { AbstractModel } from '@core/data/src/lib/models';
import { PermissionModel } from '@core/users/src/lib/models';


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
  content: any;

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


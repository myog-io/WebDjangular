import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';

import { ContentTypeForm } from '../forms/ContentType.form';

@JsonApiModelConfig({
  type: 'content_type'
})
export class ContentTypeModel extends AbstractModel {
  public static formClassRef = ContentTypeForm;

  @Attribute()
  id: string;

  @Attribute()
  app_label: string;

  @Attribute()
  model: string;

  get pk() {
    return this.id;
  }

  set pk(value) {}
}

import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';

@JsonApiModelConfig({
  type: 'content_type'
})
export class ContentTypeModel extends AbstractModel {

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

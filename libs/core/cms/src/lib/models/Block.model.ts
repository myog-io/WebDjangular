import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators } from '@angular/forms';


@JsonApiModelConfig({
  type: 'Block',
  modelEndpointUrl: 'block',
})
export class BlockModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Block Title',
    wrapper_class: 'col-6',
    placeholder: 'Enter the Block Title',
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Block Code',
    wrapper_class: 'col-6',
    placeholder: 'Enter the Block Code',
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'codeEditor',
    label: 'Block Content',
    wrapper_class: 'col-12'
  })
  content: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  get pk() {
    return this.id;
  }

  set pk(value) {

  }
  public toString = (): string => {
    return `${this.title} (#${this.id})`;
  }

}


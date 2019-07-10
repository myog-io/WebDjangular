import { Attribute, BelongsTo, JsonApiModelConfig } from 'angular2-jsonapi';
import { BlockModel } from './Block.model';
import { Validators, FormGroup } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@JsonApiModelConfig({
  type: 'PageCategory',
  modelEndpointUrl: 'cms/page-category'
})
export class PageCategoryModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12',
    placeholder: ''
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, WDAValidators.slug],
    type: 'text',
    label: 'Slug',
    wrapper_class: 'col-12',
    placeholder: ''
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: ''
  })
  description: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) { }

  public toString = (): string => {
    return `${this.title} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text'
      },
      name: {
        title: 'Name',
        type: 'text'
      },
      slug: {
        title: 'slug',
        type: 'text'
      }
    }
  };
}

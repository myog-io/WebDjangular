import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  NestedAttribute
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { CoreConfigInputModel } from './CoreConfigInput.model';
import { FormControl } from '@angular/forms';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { JsonLogic } from '@core/builder/src/lib/builder-jsonlogic';
import { BuilderFormFieldConfig } from '@core/builder/src/lib/interfaces/form-config.interface';

@JsonApiModelConfig({
  type: 'core_config_group'
})
export class CoreConfigGroupModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  order: number;

  @Attribute()
  title: string;

  @NestedAttribute()
  value: any;

  @HasMany()
  @ExtraOptions({
    type: 'ngSelect',
    label: 'Core Config Input',
    wrapper_class: 'col-6',
    model: CoreConfigInputModel,
    backendResourceName: 'core_config_input'
  })
  core_config_input: CoreConfigInputModel[];

  permissions: PermissionModel[];
  private jsonLogic: JsonLogic = new JsonLogic();

  updateValues(): any {
    this.value = {};
    let vals = {};
    for (let i = 0; i < this.inputs.length; i++) {
      const input: CoreConfigInputModel = this.inputs[i];
      if (input.value) {
        vals[input.id] = input.value;
      }
    }
    this.value = vals;
    return this.value;
  }

  get pk() {
    return this.id;
  }

  get formFields(): any {
    let fields = {};
    for (let i = 0; i < this.inputs.length; i++) {
      const input: CoreConfigInputModel = this.inputs[i];
      fields[input.id] = {
        type: FormControl,
        validators: input.validation
        //value: input.value,
      };
    }
    return fields;
  }
  get formFieldsConfigs(): BuilderFormFieldConfig[] {
    let fields = [];
    for (let i = 0; i < this.inputs.length; i++) {
      const config: BuilderFormFieldConfig = this.inputs[i].fieldConfig;
      if (config.conditional) {
        config.display = this.jsonLogic.apply(config.conditional, this.value);
      } else if (typeof config.display === 'undefined') {
        config.display = true;
      }
      fields.push(config);
    }

    return fields;
  }
}

import {
  JsonApiModelConfig,
  Attribute,
  HasMany,

} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { CoreConfigInputModel } from './CoreConfigInput.model';
import { FormControl } from '@angular/forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { JsonLogic } from 'libs/core/builder/src/lib/builder-jsonlogic';


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

  @Attribute()
  value: any;

  @HasMany()
  @ExtraOptions({
    type: 'relationship',
    label: 'Core Config Input',
    wrapper_class: 'col-6',
    options_model: CoreConfigInputModel,
    backendResourceName: 'core_config_input'
  })
  core_config_input: CoreConfigInputModel[];

  permissions: PermissionModel[];
  private jsonLogic: JsonLogic = new JsonLogic();

  updateValues():any {
    this.value = {}
    let vals = {}
    for (let i = 0; i < this.inputs.length; i++) {
      const input: CoreConfigInputModel = this.inputs[i];
      vals[input.id] = input.value;
    }
    this.value = vals;
    return this.value;
  }


  get pk() {
    return this.id;
  }

  get formFields(): any{
    let fields = {}
    for (let i = 0; i < this.inputs.length; i++) {
      const input: CoreConfigInputModel = this.inputs[i];
      fields[input.id] = {
        type: FormControl,
        validators: input.validation,
        //value: input.value,
      }
    }
    return fields;
  }
  get formFieldsConfigs(): BuilderFormFieldConfig[]{
    let fields = [];
    for (let i = 0; i < this.inputs.length; i++) {
      const config:BuilderFormFieldConfig = this.inputs[i].fieldConfig;
      if(config.conditional){
        config.display = this.jsonLogic.apply(config.conditional,this.value)
      }
      fields.push(config);

    }
    return fields;
  }
}

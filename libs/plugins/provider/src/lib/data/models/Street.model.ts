import {Attribute, BelongsTo, HasMany, JsonApiModelConfig} from "angular2-jsonapi";
import {AbstractModel} from "@webdjangular/core/data-models";
import {NumberRangeModel} from "./NumberRangeModel";

import {SmartTableSettings} from "@webdjangular/core/data";
import {ExtraOptions} from "@webdjangular/core/decorator";
import {FormArray, Validators} from "@angular/forms";


@JsonApiModelConfig({
  type: 'Street',
  modelEndpointUrl: 'provider/street',
})
export class StreetModel extends AbstractModel {
  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    placeholder: 'Street Name',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Short Name',
    name: 'short_name',
    wrapper_class: 'col-12',
    placeholder: 'Street Short Name',
  })
  short_name: string;

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'numbers',
    model: NumberRangeModel,
    options_model: NumberRangeModel
  })
  numbers: NumberRangeModel[];

  @BelongsTo({key: 'City'})
  @ExtraOptions({
    type: 'hidden',
  })
  city: number;

  get pk() {
    return null
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `Start:${this.start} End:${this.end}`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      short_name: {
        title: 'Short Name',
        type: 'text',
      }
    },
  };
}

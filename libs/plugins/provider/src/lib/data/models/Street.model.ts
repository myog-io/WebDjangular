import { JsonApiModelConfig, Attribute } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { RangeInterface, RangeModel } from "./Range.model";

import { SmartTableSettings } from "@webdjangular/core/data";
import { ExtraOptions } from "@webdjangular/core/decorator";
import { Validators, FormArray } from "@angular/forms";


export interface StreetInterface {
  name: string;
  short_name?: string;
  numbers: RangeInterface[];
}
@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
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

  @ExtraOptions({
    formType: FormArray,
    model: RangeModel,
    type: 'formArray',
    label: 'Number Range',
    name: 'numbers',
  })
  @Attribute()
  numbers: RangeInterface;


  get pk() {
    return null
  }

  set pk(value) {

  }
  public toString = (): string => {
    return `Start:${this.start} End:${this.end}`;
  }
  public static smartTableOptions:SmartTableSettings = {
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

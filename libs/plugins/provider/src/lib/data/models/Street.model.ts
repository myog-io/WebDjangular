import { Attribute, BelongsTo, HasMany, JsonApiModelConfig } from "angular2-jsonapi";
import { NumberRangeModel } from "./NumberRangeModel";
import { FormArray, Validators } from "@angular/forms";
import { AbstractModel } from "@core/data/src/lib/models";
import { ExtraOptions } from "@core/decorator/src/lib/ExtraOptions.decorator";
import { SmartTableSettings } from "@core/data/src/lib/data-store";


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
  })
  numbers: NumberRangeModel[];

  @BelongsTo()
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

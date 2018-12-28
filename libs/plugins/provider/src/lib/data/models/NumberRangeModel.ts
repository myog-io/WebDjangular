import {Attribute, BelongsTo, JsonApiModelConfig} from "angular2-jsonapi";
import {AbstractModel} from "@webdjangular/core/data-models";
import {ExtraOptions} from "@webdjangular/core/decorator";
import {SmartTableSettings} from "@webdjangular/core/data";

export interface NumberRangeInterface {
  start: number;
  end: number;
}

@JsonApiModelConfig({
  type: 'NumberRange',
  modelEndpointUrl: 'provider/number-range',
})
export class NumberRangeModel extends AbstractModel {

  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Start',
    name: 'start',
    placeholder: 'Start of the Range',
  })
  start: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'End',
    name: 'end',
    placeholder: 'End of the Range',
  })
  end: string;

  @BelongsTo({key: 'Street'})
  @ExtraOptions({
    type: 'hidden',
  })
  street: number;

  get pk() {
    return null;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `Start:${this.start} End:${this.end}`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      start: {
        title: 'Start',
        type: 'text',
      },
      end: {
        title: 'End',
        type: 'text',
      },
    },
  };
}

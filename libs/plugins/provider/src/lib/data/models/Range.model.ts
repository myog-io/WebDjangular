import { JsonApiModelConfig, Attribute } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { ExtraOptions } from "@webdjangular/core/decorator";
import { SmartTableSettings } from "@webdjangular/core/data";

export interface RangeInterface {
  start: number;
  end: number;
}
@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class RangeModel extends AbstractModel {
  @Attribute()
  @ExtraOptions( {
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

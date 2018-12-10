import { RangeForm } from "../forms/Range.form";
import { JsonApiModelConfig, Attribute } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";

export interface RangeInterface {
  start: number;
  end: number;
}
@JsonApiModelConfig({
  type: 'City',
  modelEndpointUrl: 'provider/city',
})
export class RangeModel extends AbstractModel {
  public static formClassRef = RangeForm;
  @Attribute()
  start: string;

  @Attribute()
  end: string;


  get pk() {
    return null;
  }

  set pk(value) {

  }
  public toString = (): string => {
    return `Start:${this.start} End:${this.end}`;
  }
}

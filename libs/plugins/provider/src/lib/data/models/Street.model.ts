import { RangeForm } from "../forms/Range.form";
import { JsonApiModelConfig, Attribute } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { RangeInterface } from "./Range.model";
import { StreetForm } from "../forms/Street.form";


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
  public static formClassRef = StreetForm;
  @Attribute()
  name: string;

  @Attribute()
  short_name: string;

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
}

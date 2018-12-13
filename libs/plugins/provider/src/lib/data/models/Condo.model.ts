import { JsonApiModelConfig, Attribute, BelongsTo, HasMany } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { CityModel } from "./City.model";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { CondoForm } from "../forms/Condo.form";

@JsonApiModelConfig({
  type: 'Condo',
  modelEndpointUrl: 'provider/condo',
})
export class CondoModel extends AbstractModel {
  public static formClassRef = CondoForm;
  public static include = 'city,products';

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @BelongsTo()
  city: CityModel;

  @HasMany()
  products: ProductModel;
}

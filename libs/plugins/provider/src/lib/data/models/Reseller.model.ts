import { JsonApiModelConfig, Attribute, HasMany } from "angular2-jsonapi";
import { OrderModel } from "libs/plugins/store/src/lib/data/models/Order.model";
import { AbstractModel } from "@webdjangular/core/data-models";
import { ResellerForm } from "../forms/Reseller.form";

@JsonApiModelConfig({
  type: 'Reseller',
  modelEndpointUrl: 'provider/resseler',
})
export class ResellerModel extends AbstractModel {
  public static formClassRef = ResellerForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  email: string;

  @HasMany()
  orders: OrderModel;

}

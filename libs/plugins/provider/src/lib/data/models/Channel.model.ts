import { JsonApiModelConfig, Attribute, HasMany } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { ChannelForm } from "../forms/Channel.form";

@JsonApiModelConfig({
  type: 'Channel',
  modelEndpointUrl: 'provider/channel',
})
export class ChannelModel extends AbstractModel {
  public static formClassRef = ChannelForm;
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  logo: string;

  @Attribute()
  groups: string;

  @Attribute()
  types: string;

  @Attribute()
  number: number

  @Attribute()
  position: number

  @HasMany()
  products: ProductModel

}

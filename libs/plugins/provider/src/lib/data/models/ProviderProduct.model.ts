import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { Attribute, HasMany } from "angular2-jsonapi";


export class ProviderProductModel extends ProductModel{
  @Attribute()
  channel_count: number;

  @Attribute()
  channel_hd_count: number

  @HasMany({key:'Channel'})
  @Attribute()
  channels: object[]

}

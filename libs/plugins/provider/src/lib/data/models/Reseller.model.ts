import { JsonApiModelConfig, Attribute, HasMany } from "angular2-jsonapi";
import { OrderModel } from "libs/plugins/store/src/lib/data/models/Order.model";
import { AbstractModel } from "@webdjangular/core/data-models";
import { SmartTableSettings } from "@webdjangular/core/data";
import { ExtraOptions } from "@webdjangular/core/decorator";
import { Validators } from "@angular/forms";

@JsonApiModelConfig({
  type: 'Reseller',
  modelEndpointUrl: 'provider/reseller',
})
export class ResellerModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'text',
    label: 'Name',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.email],
    type: 'text',
    inputType: 'email',
    label: 'Email',
  })
  email: string;

  public static smartTableOptions:SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      email: {
        title: 'Email',
        type: 'text',
      }
    },
  };

}

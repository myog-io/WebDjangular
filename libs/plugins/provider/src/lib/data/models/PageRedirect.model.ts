import { JsonApiModelConfig, Attribute, HasMany, BelongsTo, JsonApiMetaModel } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { PageModel } from '@webdjangular/core/cms-models';
import { CityModel } from '../models/City.model';
import { SmartTableSettings } from '@webdjangular/core/data';
import { FormGroup, Validators, FormArray } from '@angular/forms';

@JsonApiModelConfig({
  type: 'PageRedirect',
  modelEndpointUrl: 'provider/page-redirect',
})
export class PageRedirectModel extends AbstractModel {
  public static include = 'default_page,redirect_page,cities';

  @Attribute()
  id: string;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    model: PageModel,
    validators: [Validators.required],
    type: 'select',
    label: 'Redirect from Page:',
    wrapper_class: 'col-6',
  })
  default_page: PageModel;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    model: PageModel,
    validators: [Validators.required],
    type: 'select',
    label: 'Redirect to Page:',
    wrapper_class: 'col-6',
  })
  redirect_page: PageModel;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    model: CityModel,
    validators: [Validators.required],
    type: 'checkbox',
    label: 'Cities',
    name: 'cities',
  })
  cities: CityModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[]

  public static preparePageRow(cell: any, row: any) {

    return cell.toString();
  }
  public static prepareCityRow(cell: any, row: any) {
    let str = "";
    for (let i = 0; i < cell.length; i++) {
      const element = cell[i];
      str += `${element.toString()}<br>`;
    }
    return str;
  }

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      default_page: {
        title: 'Redirect From',
        type: 'text',
        valuePrepareFunction: PageRedirectModel.preparePageRow
      },
      redirect_page: {
        title: 'Redirect To',
        type: 'text',
        valuePrepareFunction: PageRedirectModel.preparePageRow
      },
      cities: {
        title: 'Cities',
        type: 'html',
        valuePrepareFunction: PageRedirectModel.prepareCityRow
      }
    },
  };

}


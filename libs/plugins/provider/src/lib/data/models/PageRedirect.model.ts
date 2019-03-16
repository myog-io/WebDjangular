import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo,
  JsonApiMetaModel
} from 'angular2-jsonapi';
import { CityModel } from '../models/City.model';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PageModel } from '@core/cms/src/lib/models';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'PageRedirect',
  modelEndpointUrl: 'provider/page-redirect'
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
    type: 'ngSelect',
    label: 'Redirect from Page:',
    wrapper_class: 'col-6'
  })
  default_page: PageModel;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    model: PageModel,
    validators: [Validators.required],
    type: 'ngSelect',
    label: 'Redirect to Page:',
    wrapper_class: 'col-6'
  })
  redirect_page: PageModel;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    model: CityModel,
    validators: [Validators.required],
    type: 'checkbox',
    label: 'Cities',
    name: 'cities'
  })
  cities: CityModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  public static preparePageRow(cell: any, row: any) {
    return cell.toString();
  }
  public static prepareCityRow(cell: any, row: any) {
    let str = '';
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
    }
  };
}

import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { SmartTableSettings } from '@webdjangular/core/data';
import { PageForm } from '@webdjangular/core/cms-forms';
import { CityForm } from './City.form';
import { PageModel } from '@webdjangular/core/cms-models';
import { CityModel } from '../models/City.model';

export class PageRedirectForm extends AbstractForm {
  public preparePageRow(cell:any,row:any){

    return cell.toString();
  }
  public prepareCityRow(cell:any,row:any){
    let str = "";
    for (let i = 0; i < cell.length; i++) {
      const element = cell[i];
      str += `${element.toString()}<br>`;
    }
    return str;
  }

  public listingTableSettings: SmartTableSettings = {
    columns: {
      default_page: {
        title: 'Redirect From',
        type: 'text',
        valuePrepareFunction: this.preparePageRow
      },
      redirect_page: {
        title: 'Redirect To',
        type: 'text',
        valuePrepareFunction: this.preparePageRow
      },
      cities: {
        title: 'Cities',
        type: 'html',
        valuePrepareFunction: this.prepareCityRow
      }
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    default_page: {
      type: FormGroup,
      model: PageModel,
      validators: [Validators.required]
    },
    redirect_page: {
      type: FormGroup,
      model: PageModel,
      validators: [Validators.required]
    },
    cities: {
      type: FormArray,
      model: CityModel,
      validators: [Validators.required]
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    },
  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'relationship',
      label: 'Redirect from Page:',
      name: 'default_page',
      wrapper_class: 'col-6',
      options_model: PageModel,
    },
    {
      type: 'relationship',
      label: 'Redirect to Page:',
      name: 'redirect_page',
      wrapper_class: 'col-6',
      options_model: PageModel,
    },
    {
      type: 'checkbox',
      label: 'Cities',
      name: 'cities',
      options_model: CityModel,
    }
  ]
}

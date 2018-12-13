import { AbstractForm } from "@webdjangular/core/data-forms";
import { SmartTableSettings } from "@webdjangular/core/data";
import { FormControl, Validators, FormGroup, FormArray } from "@angular/forms";
import { BuilderFormFieldConfig } from "@webdjangular/core/builder";
import { CityModel } from "../models/City.model";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";

export class CondoForm extends AbstractForm {
  public listingTableSettings:SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      city: {
        title: 'City',
        type: 'text',
        valuePrepareFunction:(cell,row) => {
          return `${cell.name} (${cell.id})`
        }
      }
    },
  };

  formFields = {
    id: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    city: {
      type: FormGroup,
      validators: [Validators.required],
      model: CityModel
    },
    products: {
      type: FormArray,
      model: ProductModel
    }
  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      inputType: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'relationship',
      label: 'Email',
      name: 'email',
    },
    {
      type: 'checkbox',
      label: 'Products',
      name: 'products',
      options_model: ProductModel
    }
  ]
}

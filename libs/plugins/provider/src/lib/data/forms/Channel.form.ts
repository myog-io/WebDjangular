import { AbstractForm } from "@webdjangular/core/data-forms";
import { SmartTableSettings } from "@webdjangular/core/data";
import { FormControl, Validators, FormArray } from "@angular/forms";
import { BuilderFormFieldConfig } from "@webdjangular/core/builder";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";

export class ChannelForm extends AbstractForm {
  public listingTableSettings:SmartTableSettings = {
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

  formFields = {
    id: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    logo: {
      type: FormControl
    },
    types: {
      types: FormControl
    },
    groups: {
      types: FormControl
    },
    number: {
      type: FormControl,
      validators: [Validators.required]
    },
    position: {
      type: FormControl,
    },
    products:{
      type: FormArray
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      inputType: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'text',
      label: 'Logo',
      name: 'logo',
    },
    {
      type: 'select',
      label: 'Types',
      name: 'types',
    },
    {
      type: 'select',
      label: 'Groups',
      name: 'groups',
    },
    {
      type: 'text',
      inputType: 'number',
      label: 'Channel Number',
      name: 'number',
    },
    {
      type: 'text',
      inputType: 'number',
      label: 'Positon',
      name: 'position',
    },
    {
      type: 'checkbox',
      label: 'Products',
      name: 'products',
      options_model: ProductModel
    }
  ]

}

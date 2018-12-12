import { FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { PermissionModel } from '../models/Permission.model';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { SmartTableSettings } from '@webdjangular/core/data';

export class GroupForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text',
      },
      name: {
        title: 'Name',
        type: 'text',

      },
    },
  };

  formFields = {
    pk: {
      type: FormControl
    },

    name: {
      type: FormControl
    },
    permissions: {
      type: FormArray,
      model: PermissionModel
    }
  };
  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',

    },
    {
      type: 'checkbox',
      label: 'Permissions',
      name: 'permissions',
      wrapper_class: 'col-12',
      options_model: PermissionModel,
    },

  ]
}

import { FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { PermissionModel } from '../models/Permission.model';

export class GroupForm extends AbstractForm {
  formFields = {
    pk: {
      type: FormControl
    },
    id: {
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
}

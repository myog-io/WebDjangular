import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { PermissionForm } from './Permission.form';

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
      from: PermissionForm
    }
  };
}

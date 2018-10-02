import { FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { GroupForm } from './Group.form';

export class UserForm extends AbstractForm {
  formFields = {
    pk: {
      type: FormControl
    },
    id: {
      type: FormControl
    },
    password: {
      type: FormControl
    },
    last_login: {
      type: FormControl
    },
    is_superuser: {
      type: FormControl
    },
    first_name: {
      type: FormControl
    },
    middle_name: {
      type: FormControl
    },
    last_name: {
      type: FormControl
    },
    username: {
      type: FormControl
    },
    email: {
      type: FormControl
    },
    mobile: {
      type: FormControl
    },
    is_tfa_enabled: {
      type: FormControl
    },
    is_email_verified: {
      type: FormControl
    },
    is_mobile_verified: {
      type: FormControl
    },
    is_staff: {
      type: FormControl
    },
    created: {
      type: FormControl
    },
    updated: {
      type: FormControl
    },
    groups: {
      type: FormArray,
      getFormFrom: GroupForm
    }
  };
}

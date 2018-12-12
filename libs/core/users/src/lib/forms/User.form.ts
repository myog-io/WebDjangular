import { FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { GroupModel } from '../models/Group.model';
import { SmartTableSettings } from '@webdjangular/core/data';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class UserForm extends AbstractForm {
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
      email: {
        title: 'Email',
        type: 'html',
      }
    },
  };

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
      model: GroupModel
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'First Name',
      name: 'first_name',
      wrapper_class: 'col-4',

    },
    {
      type: 'text',
      label: 'Middle Name',
      name: 'middle_name',
      wrapper_class: 'col-4',
    },
    {
      type: 'text',
      label: 'Last Name',
      name: 'last_name',
      wrapper_class: 'col-4',
    },
    {
      type: 'text',
      label: 'Password',
      name: 'password',
      wrapper_class: 'col-4',
      inputType: 'password'
    },
    {
      type: 'text',
      label: 'Email',
      name: 'email',
      wrapper_class: 'col-4',
      inputType: 'email'
    },
    {
      type: 'text',
      label: 'Mobile Phone',
      name: 'mobile',
      wrapper_class: 'col-4',
      inputType: 'phone'
    },
    {
      type: 'text',
      label: 'Mobile Phone',
      name: 'mobile',
      wrapper_class: 'col-4',
      inputType: 'phone'
    },
    {
      type: 'switch',
      label: 'Enable 2fa?',
      name: 'is_tfa_enabled',
      wrapper_class: 'col-4',
    },
    {
      type: 'switch',
      label: 'Email Verified?',
      name: 'is_email_verified',
      wrapper_class: 'col-4',
    },
    {
      type: 'switch',
      label: 'Mobile Verified?',
      name: 'is_mobile_verified',
      wrapper_class: 'col-4',
    },
    {
      type: 'checkbox',
      label: 'Groups',
      name: 'groups',
      wrapper_class: 'col-12',
      options_model: GroupModel,
    },

  ]
}

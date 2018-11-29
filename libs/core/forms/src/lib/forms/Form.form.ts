import {FormControl, Validators} from '@angular/forms';

import {AbstractForm} from '@webdjangular/core/data-forms';
import {ScaffoldFieldConfig} from '@webdjangular/core/interfaces';

export class FormForm extends AbstractForm {

  public listingTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      slug: {
        title: 'Form slug',
        type: 'string',
      },
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    slug: {
      type: FormControl,
      validators: [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")]
    },
    title: {
      type: FormControl,
      validators: [Validators.required]
    },
    content: {
      type: FormControl,
      validators: [Validators.required]
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    },
  };

  scaffoldFields: ScaffoldFieldConfig[] = [
    {
      type: 'input',
      label: 'Form Title',
      name: 'title',
      placeholder: 'Enter Form Title',
    },
    {
      type: 'input',
      label: 'Form slug',
      name: 'slug',
      placeholder: 'Enter the Form slug',
    },
    {
      type: 'formBuilder',
      label: 'Form Content',
      name: 'content',
    }
  ]

}

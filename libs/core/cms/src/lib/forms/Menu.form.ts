import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class MenuForm extends AbstractForm {

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
        title: 'Unique Slug',
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
      validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')]
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
  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Block Title',
      name: 'title',
      placeholder: 'Enter Block Title',
    },
    {
      type: 'text',
      label: 'Unique Code',
      name: 'slug',
      placeholder: 'Enter Block Code (slug)',
    },
    {
      type: 'codeEditor',
      label: 'Block Content',
      name: 'content',
    }
  ]

}

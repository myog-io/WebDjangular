import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { BlockModel } from '../models/Block.model';
import { BlockForm } from './Block.form';
//import { BlockModel } from '../models';

export class PageForm extends AbstractForm {

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
        title: 'Url Path',
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
    header: {
      type: FormGroup,
      model: BlockModel,
    },
    footer: {
      type: FormGroup,
      model: BlockModel,
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
      label: 'Page Title',
      name: 'title',
      placeholder: 'Enter Page Title',
    },
    {
      type: 'text',
      label: 'Page Url',
      name: 'slug',
      placeholder: 'Enter Page Url (slug)',
    },
    {
      type: 'codeEditor',
      label: 'Page Content',
      name: 'content',
    },
    {
      type: 'relationship',
      label: 'Header',
      name: 'header',
      wrapper_class: 'col-6',
      options_model: BlockModel,
    },
    {
      type: 'relationship',
      label: 'Footer',
      name: 'footer',
      wrapper_class: 'col-6',
      options_model: BlockModel,
    }
  ]
  public toString = (): string => {
    return `${this.value.title} (ID: ${this.value.pk})`;
  }
}

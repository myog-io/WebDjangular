import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { ScaffoldFieldConfig } from '../../interfaces/scaffold-field-config.interface';

export class PageForm extends AbstractForm {
    private slugPattern = "^[a-z0-9_-]{8,15}$";
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
        },
        title: {
            type: FormControl,
        },
        content: {
            type: FormControl,
        },
        created: {
            type: FormControl,
        },
        updated: {
            type: FormControl,
        },
    }

    scaffoldFields: ScaffoldFieldConfig[] = [
        {
            type: 'input',
            label: 'Page Title',
            name: 'title',
            placeholder: 'Enter Page Title',
            validation: [Validators.required]
        },
        {
            type: 'input',
            label: 'Page Url',
            name: 'slug',
            placeholder: 'Enter Page Url (slug)',
            validation: [Validators.required, Validators.pattern(this.slugPattern)]
        },
        {
            type: 'ckeditor',
            label: 'Page Content',
            name: 'content',
            validation: [Validators.required]
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ]

}
import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { ScaffoldFieldConfig } from '../../interfaces/scaffold-field-config.interface';

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
    }

    scaffoldFields: ScaffoldFieldConfig[] = [
        {
            type: 'input',
            label: 'Page Title',
            name: 'title',
            placeholder: 'Enter Page Title',
        },
        {
            type: 'input',
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
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ]

}
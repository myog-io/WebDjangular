import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { ScaffoldFieldConfig } from '../../interfaces/scaffold-field-config.interface';

export class ThemeForm extends AbstractForm {

    public listingTableSettings = {
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            name: {
                title: 'Name',
                type: 'string',
            },
            slug: {
                title: 'Url Path',
                type: 'string',
            },
            version: {
                title: 'Version',
                type: 'string',
            },
            current_version: {
                title: 'Current Version',
                type: 'string',
            },
            active: {
                title: 'Active',
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
        name: {
            type: FormControl,
            validators: [Validators.required]
        },
        angular_module: {
            type: FormControl,
            validators: [Validators.required]
        },
        active: {
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
            label: 'Name',
            name: 'name',
            placeholder: 'Enter Theme Name',
        },
        {
            type: 'input',
            label: 'Active',
            name: 'active',
            placeholder: 'Enter Page Url (slug)',
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ]

}
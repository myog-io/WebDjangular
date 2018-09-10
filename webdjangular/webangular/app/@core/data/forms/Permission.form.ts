import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from './Abstract.form';

export class PermissionForm extends AbstractForm{

	formFields = {
		pk: {
        	type: FormControl,
        },
		id: {
        	type: FormControl,
        },
		name: {
			type: FormControl,
		},
		content_type_id: {
			type: FormControl,
		},
		codename: {
			type: FormControl,
		},
	}

}
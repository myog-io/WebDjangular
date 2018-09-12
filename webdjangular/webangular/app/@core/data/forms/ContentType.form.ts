import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from './Abstract.form';

export class ContentTypeForm extends AbstractForm{

	formFields = {
		pk: {
        	type: FormControl,
        },
		app_label: {
        	type: FormControl,
        },
		model: {
			type: FormControl,
		},
	}

}
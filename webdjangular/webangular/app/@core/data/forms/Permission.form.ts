import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { ContentTypeForm } from './ContentType.form';

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
		content_type: {
			type: FormGroup,
			getFormFrom: ContentTypeForm
		},
		codename: {
			type: FormControl
		},
	}

}
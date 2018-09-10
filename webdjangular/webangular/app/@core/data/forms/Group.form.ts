import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { PermissionForm } from './Permission.form';

export class GroupForm extends AbstractForm{

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
		permission: {
			type: FormArray,
			getFormFrom: PermissionForm,
		}
	}

}
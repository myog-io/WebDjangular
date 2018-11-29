import { FormGroup, FormControl } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { ContentTypeForm } from '@webdjangular/core/data-forms';

export class PermissionForm extends AbstractForm {
  formFields = {
    pk: {
      type: FormControl
    },
    id: {
      type: FormControl
    },
    name: {
      type: FormControl
    },
    content_type: {
      type: FormGroup,
      formClass: ContentTypeForm
    },
    codename: {
      type: FormControl
    }
  };
}

import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings } from '@webdjangular/core/data';

export class OrderForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      order_num: {
        title: 'Order number',
        type: 'text',
      },
      status: {
        title: 'Status',
        type: 'text',
      },
      created: {
        title: 'Created',
        type: 'text',
      }
    },
  };

  formFields = { // Orders can not be created/updated/deleted by CRUD operations
    pk: {
      type: FormControl,
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [

  ]
}

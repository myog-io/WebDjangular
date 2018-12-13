import { AbstractForm } from "@webdjangular/core/data-forms";
import { SmartTableSettings } from "@webdjangular/core/data";
import { FormControl, Validators } from "@angular/forms";
import { BuilderFormFieldConfig } from "@webdjangular/core/builder";

export class ResellerForm extends AbstractForm {
  public listingTableSettings:SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      logo: {
        title: 'Logo',
        type: 'text',
      },
      number: {
        title: 'Number',
        type: 'text',
      }
    },
  };

  formFields = {
    id: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    email: {
      type: FormControl,
      validators: [Validators.required, Validators.email]
    },
  }
  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      inputType: 'text',
      label: 'Name',
      name: 'name',
    },
    {
      type: 'text',
      inputType: 'email',
      label: 'Email',
      name: 'email',
    },
  ]
}

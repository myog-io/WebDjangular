import {JsonApiModel} from 'angular2-jsonapi';

import {FormGroup, Validators, FormControl, FormArray} from '@angular/forms';

import {ScaffoldFieldConfig} from '@webdjangular/core/interfaces';
import {FormioForm} from "angular-formio";

export class AbstractForm {

  /**
   * Form fields of abstract form
   */
  public formFields = {};

  /**
   * Scaffold fields of abstract form
   */
  public scaffoldFields: ScaffoldFieldConfig[] = [];


  /**
   * Scaffold Form of FormioForm
   */
  public scaffoldForm: FormioForm = {};

  /**
   * Listing table settings of abstract form
   */
  public listingTableSettings = {};

  /**
   * Creates an instance of abstract form.
   */
  public constructor() {

  }

  /**
   * Transforming the Group to String for the Scaffold Naming
   */
  public toString = (): string => {
    //return `#${this.value.pk}`;
    return "STRING";
  }
}

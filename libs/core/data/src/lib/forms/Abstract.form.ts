import { JsonApiModel } from 'angular2-jsonapi';

import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { ScaffoldFieldConfig } from '@webdjangular/core/interfaces';

export class AbstractForm extends FormGroup {
  public formFields = {};
  public scaffoldFields: ScaffoldFieldConfig[] = [];
  public listingTableSettings = {};

  public constructor() {
    super({});
  }

  public generateForm() {
    for (let propName in this.formFields) {
      if (this.formFields[propName].type == FormArray) {
        this.registerControl(propName, new FormArray([], []));
      } else if (this.formFields[propName].type == FormGroup) {
        this.registerControl(propName, new FormGroup({}));
      } else {
        let validators = [];

        if (typeof this.formFields[propName]['validators'] !== 'undefined') {
          validators = this.formFields[propName]['validators'];
        }

        this.registerControl(propName, new FormControl(null, validators));
      }
    }
  }

  public populateForm(entity: JsonApiModel = null) {
    for (let propName in this.formFields) {
      if (
        this.formFields[propName].type == FormArray &&
        typeof entity[propName] !== 'undefined'
      ) {
        for (
          let i = 0;
          i < entity[propName].length &&
          typeof this.formFields[propName].getFormFrom !== 'undefined';
          i++
        ) {
          let fa = this.get(propName) as FormArray;
          let fb = new this.formFields[propName].getFormFrom();

          fb.generateForm();
          fb.populateForm(entity[propName][i]);
          fa.push(fb);
        }
      } else {
        if (
          this.formFields[propName].type == FormGroup &&
          typeof entity[propName] !== 'undefined'
        ) {
          let fg = this.get(propName) as FormGroup;

          let fb = new this.formFields[propName].getFormFrom();
          fb.generateForm();
          fb.populateForm(entity[propName]);

          for (let controlName in fb.controls) {
            fg.addControl(controlName, fb.controls[controlName]);
          }
        } else if (typeof entity[propName] !== 'undefined') {
          this.get(propName).setValue(entity[propName]);
        }
      }
    }
  }

  public updateModel(entity: JsonApiModel) {
    let values = this.value;

    for (let propName in values) {
      entity[propName] = values[propName];
    }
  }

  public getAttributeHasManyDifference(formKey: string = null, fullArray = []) {
    let diff = [];
    let control = this.get(formKey);
    let hasNot = true;

    fullArray.map(function(item) {
      hasNot = true;
      control.value.map(function(item2) {
        if (item2.pk == item.pk) {
          hasNot = false;
        }
      });

      if (hasNot == true) {
        diff.push(item);
      }
    });

    return diff;
  }

  public doesEntityHasRelationship(
    formKey: string = null,
    toRelateEntity = null
  ) {
    let control = this.get(formKey);

    return (
      control.value.filter(function(alreadyRelatedEntity) {
        return alreadyRelatedEntity.pk == toRelateEntity.pk;
      }).length > 0
    );
  }

  public checkboxRelationListener(
    $event,
    formKey: string = null,
    toRelateEntity = null
  ) {
    let control = this.get(formKey) as FormArray;

    if ($event.target.checked == false) {
      for (let i = 0; i < control.value.length; i++) {
        if (control.value[i].pk == toRelateEntity.pk) {
          control.removeAt(i);
        }
      }
    } else {
      let fb = new this.formFields[formKey].getFormFrom();
      fb.generateForm();
      fb.populateForm(toRelateEntity);
      control.push(fb);
    }
  }

  public pushToFormArrayAttribute(formKey: string = null, entityToPush) {
    if (this.formFields[formKey].type == FormArray) {
      let fa = this.get(formKey) as FormArray;
      let f = new entityToPush.constructor.formClassRef();
      f.generateForm();
      f.populateForm(entityToPush);
      fa.push(f);
    }
  }
}

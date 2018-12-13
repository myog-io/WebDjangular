import { Component, Input } from "@angular/core";
import { AbstractForm } from "@webdjangular/core/data-forms";
import { group } from "@angular/animations";
import { BuilderFormFieldConfig } from "../../interfaces/form-config.interface";

@Component({
  selector: 'wda-form-validators',
  template: `
  <div *ngIf="input.invalid && (input.dirty || input.touched)" class="alert alert-danger">

    <div *ngIf="input.errors.required">
      {{config.label}} is required.
    </div>
    <div *ngIf="input.errors.minlength">
      {{config.label}} must be at least 4 characters long.
    </div>
    <div *ngIf="input.errors.forbiddenName">
      {{config.label}} cannot be {{input.value}}.
    </div>

  </div>

`
})
export class BuilderFormValidatorComponent {
  @Input() config:BuilderFormFieldConfig
  @Input() input:AbstractForm

}

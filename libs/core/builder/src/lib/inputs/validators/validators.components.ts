import {Component, Input} from "@angular/core";
import { BuilderFormFieldConfig } from "../../interfaces/form-config.interface";
import { AbstractForm } from "@core/data/src/lib/forms";

@Component({
  selector: 'wda-form-validators',
  template: `
    <div *ngIf="input">
      <div *ngIf="input.invalid && (input.dirty || input.touched)" class="alert alert-danger">

        <div *ngIf="input.errors.required">
          {{config.label}} is required.
        </div>
        <div *ngIf="input.errors.minlength">
          {{config.label}} must be at least X characters long.
        </div>
        <div *ngIf="input.errors.forbiddenName">
          {{config.label}} cannot be {{input.value}}.
        </div>
        <div *ngIf="input.errors.pattern">
          {{config.label}} invalid.
        </div>
        
      </div>
    </div>
  `
})
export class BuilderFormValidatorComponent {
  @Input() config: BuilderFormFieldConfig;
  @Input() input: AbstractForm;

}

import {Component, Input} from "@angular/core";
import {AbstractForm} from "@webdjangular/core/data-forms";
import {group} from "@angular/animations";
import {BuilderFormFieldConfig} from "@webdjangular/core/builder";

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
        <code><pre class="code">{{input.errors | json}}</pre></code>
      </div>
    </div>
  `
})
export class BuilderFormValidatorComponent {
  @Input() config: BuilderFormFieldConfig;
  @Input() input: AbstractForm;

}

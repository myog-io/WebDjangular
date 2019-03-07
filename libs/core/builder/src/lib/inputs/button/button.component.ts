import {Component, EventEmitter, Output} from '@angular/core';
import { BuilderFormFieldConfig, BuilderFormField } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-button',
  styleUrls: ['button.component.scss'],
  template: `
    <div class="dynamic-field form-button"
         [formGroup]="group" >
      <button type="submit" class="btn" 
              [ngClass]="config.element_class" 
              [disabled]="isDisabled()">
        <span *ngIf="this.group.formSubmiting">
          <i class="fas fa-spinner fa-pulse"></i> 
          <span class="pl-2">Carregando</span>
        </span>
        <span *ngIf="!this.group.formSubmiting">
          {{ config.label }}
        </span>
      </button>
    </div>
  `
})
export class BuilderFormButtonComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  @Output() relationshipUpdated: EventEmitter<any> = new EventEmitter();
  // TODO: button can be type "button" as well, not just submit.

  isDisabled() {

    if(this.config.disabled) {
      return this.config.disabled;
    }

    // if type is submit:
    if(this.group.formSubmiting) return true;

    if(this.group.formSubmitAttempts > 0 && this.group.valid == false) {
      return true;
    }
  }


}

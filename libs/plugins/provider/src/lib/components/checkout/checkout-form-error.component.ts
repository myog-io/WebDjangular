import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'plugin-provider-checkout-error',
  template: `
    <div class="errors-feedback" *ngIf="ctrl.touched && ctrl.errors">
      <div *ngIf="ctrl.errors.required" class="alert alert-danger" role="alert">
        <span *ngIf="!message">{{ name }} é obrigatório </span>
        <span *ngIf="message">{{ message }}</span>
      </div>
      <div
        *ngIf="ctrl.errors.email || ctrl.errors.minlength || ctrl.errors.maxlength || ctrl.errors['Mask error']"
        class="alert alert-danger"
        role="alert"
      >
        {{ name }} inválido
      </div>
    </div>
  `
})
export class PluginProviderCheckoutErrorComponent implements OnInit {
  @Input() ctrl: FormControl;
  @Input() name: string = 'Campo';
  @Input() message: string = '';

  ngOnInit() { }
}

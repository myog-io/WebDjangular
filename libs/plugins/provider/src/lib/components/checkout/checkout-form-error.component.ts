import {Component, OnInit, Input} from '@angular/core';
import {ProviderCheckoutService, ProviderCheckoutSteps} from "../../data/services/provider-checkout.service";
import {ActivatedRoute} from "@angular/router";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'plugin-provider-checkout-error',
  template: `
    <div class="errors-feedback" *ngIf="ctrl.touched && ctrl.errors">
        

        <div *ngIf="ctrl.errors.required" class="alert alert-danger" role="alert">   {{name}} é obrigatório </div>
        <div *ngIf="ctrl.errors.email || ctrl.errors.minlength || ctrl.errors.maxlength" class="alert alert-danger"role="alert"> {{name}} inválido </div>
    </div>
`,
})
export class PluginProviderCheckoutErrorComponent implements OnInit {
    @Input() ctrl:FormControl;
    @Input() name:string = "Campo"

  ngOnInit() {
    
  }

}

import { Component, OnInit } from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {CartTermModel} from "@plugins/store/src/lib/data/models/CartTerm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'plugin-provider-checkout-wizard-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss'],
})
export class PluginProviderCheckoutWizardStep02Component implements OnInit {

  public terms: CartTermModel[];
  public formWizardStep02: FormGroup;

  constructor(public providerCheckout: ProviderCheckoutService,
              public formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.formWizardStep02 = this.formBuilder.group({
      paymentType: ['', [Validators.required]],
    });
    //this.config.forEach(control => group.addControl(control.name, this.fb.control()));
    // group;

    this.providerCheckout.cartService.getCardTerms().then((terms:CartTermModel[])=>{
      this.terms = terms;
      this.terms.forEach((term) => {
        this.formWizardStep02.addControl( `term-${term.id}`,
          this.formBuilder.control('', [Validators.requiredTrue]));
      });
    });
  }

  onSubmit() {
    this.getFormValidationErrors();

    if (this.formWizardStep02.valid) {
      //this.providerCheckout.onWizardStep02Submit()
    }
  }

  getFormValidationErrors() {
  Object.keys(this.formWizardStep02.controls).forEach(key => {

  const controlErrors = this.formWizardStep02.get(key).errors;
  if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}

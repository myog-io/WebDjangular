import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'plugin-provider-checkout-wizard-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class PluginProviderCheckoutWizardStep01Component implements OnInit {

  public formWizardStep01: FormGroup;
  public formWizardStep01Submitted: boolean = false;

  constructor(public providerCheckout: ProviderCheckoutService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formWizardStep01 = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
      telephone: [''],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      dob: ['', [Validators.required, Validators.minLength(8)]],

      postal_code: [''],
      city: [''],
      state: [''],
      number: [''],
      street_address_1: [''],
      street_address_2: [''],
      street_address_3: [''],
    });
  }

  onSubmit() {
    if (this.formWizardStep01.valid) {
      this.providerCheckout.onWizardStep01Submit()
    }
  }



}

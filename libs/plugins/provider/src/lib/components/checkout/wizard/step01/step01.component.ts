import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "@core/users/src/lib/models";
import {WebAngularDataStore} from "@core/services/src/lib/WebAngularDataStore.service";

@Component({
  selector: 'plugin-provider-checkout-wizard-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class PluginProviderCheckoutWizardStep01Component implements OnInit {

  public formWizardStep01: FormGroup;
  public formWizardStep01Submitted: boolean = false;
  public user: UserModel = null;

  constructor(public datastore: WebAngularDataStore,
              public providerCheckout: ProviderCheckoutService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user = this.providerCheckout.cartService.cart.user;
    let cpf: string = '';
    let rg: string = '';
    if (this.user) {
      if (this.user.extra_data.hasOwnProperty('cpf')) cpf = this.user.extra_data['cpf'];
      if (this.user.extra_data.hasOwnProperty('rg')) rg = this.user.extra_data['rg'];
    }
    this.formWizardStep01 = this.formBuilder.group({
      name: [this.user ? this.user.name : '', [Validators.required, Validators.minLength(2)]],
      email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
      mobile: [this.user ? this.user.mobile : '', [Validators.required, Validators.minLength(11)]],
      telephone: [''],
      cpf: [cpf, [Validators.required]],
      rg: [rg, [Validators.required]],
      dob: [this.user ? this.user.dob : '', [Validators.required, Validators.minLength(8)]],

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

      const fullname: string = this.formWizardStep01.get('name').value;
      const first_name: string = fullname.split(' ').slice(0, -1).join(' ');
      const last_name: string = fullname.split(' ').slice(-1).join(' ');
      const username: string = first_name + '_' + Math.random().toString(36).substr(2, 9);

      if (!this.user) {
        this.user = this.datastore.createRecord(UserModel, {})
      }


      this.user.first_name = first_name;
      this.user.last_name = last_name;
      this.user.mobile = this.formWizardStep01.get('mobile').value;
      this.user.username = username;
      this.user.email = this.formWizardStep01.get('email').value;
      this.user.dob = this.formWizardStep01.get('dob').value;
      this.user.extra_data = {
        cpf: this.formWizardStep01.get('cpf').value,
        rg: this.formWizardStep01.get('cpf').value
      };

      this.providerCheckout.cartService.createOrUpdateGuestUser(this.user).then((
        user: UserModel) => {

      });

      //this.providerCheckout.onWizardStep01Submit()
    }
  }


}
